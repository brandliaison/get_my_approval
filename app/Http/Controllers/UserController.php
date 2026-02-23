<?php

namespace App\Http\Controllers;

use App\CommonHelpers\CommonHelpers;
use App\Mail\EmailOTP;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'required|string|unique:users,phone',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Generate OTPs
        $phoneOtp = rand(100000, 999999);
        $emailOtp = rand(100000, 999999);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'phone_otp' => $phoneOtp,
            'email_otp' => $emailOtp,
            'phone_verified_at' => null,
            'email_verified_at' => null,
            'status' => 'pending', // Set status as 'pending' until verified
        ]);

        // Send OTP via Email using Mailable class
        // Mail::to($user->email)->send(new EmailOTP($emailOtp));
        // CommonHelpers::sendOtp($request->phone, $phoneOtp);

        return response()->json([
            'message' => 'User registered successfully. Please verify your email & phone.',
            'user' => $user->_id
        ], 201);
    }

    public function login(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (Auth::attempt($validate)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return response()->json(['data' => $token, 'status' => true], 200);
        } else {
            return response()->json(['status' => false], 400);
        }
    }

    public function verifyMemberOtp(Request $request)
    {
        $user = User::find($request->id);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        $url = false;
        if ($request->type == 'email') {
            if ($user->email_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['email_verified_at'] = now()->timestamp;
                $data['email_otp'] = null;
            }
        }
        if ($request->type == 'phone') {
            if ($user->phone_otp !== (int) $request->otp) {
                return response()->json([
                    'status' => 'danger',
                    'message' => 'OTP Not Valid!',
                ], 200);
            } else {
                $data['phone_verified_at'] = now()->timestamp;
                $data['phone_otp'] = null;
                $data['status'] = 'active';
            }
        }
        $user = $user->update($data);

        $userNew = User::find($request->id);
        if (isset($userNew->email_verified_at) && $userNew->phone_verified_at) {
            $url = true;
        }
        return response()->json([
            'status' => 'success',
            'message' => 'Otp Has Been Verified!',
            'url' => $url,
        ], 201);
    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        // Generate OTP (6-digit random number)
        $otp = rand(100000, 999999);

        // Save OTP & expiry time in the user table
        $user->update([
            'email_otp' => $otp,
        ]);

        // Send OTP via email
        Mail::raw("Your password reset OTP is: $otp", function ($message) use ($user) {
            $message->to($user->email)->subject('Password Reset OTP');
        });

        return response()->json(['message' => 'OTP sent to your email.']);
    }

    public function verifyResetOtp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        return response()->json(['message' => 'OTP verified successfully.']);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
            'otp' => 'required|digits:6',
            'password' => 'required|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || $user->email_otp !== (int) $request->otp) {
            return response()->json(['error' => 'Invalid OTP'], 400);
        }

        // Update password & clear OTP
        $user->update([
            'password' => Hash::make($request->password),
            'email_otp' => null,
        ]);

        return response()->json(['message' => 'Password reset successfully.']);
    }

    public function updateProfile(Request $request)
    {
        // Validate request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'profile_photo' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'address' => 'nullable|string',
            'country' => 'nullable|string',
            'state' => 'nullable|string',
            'district' => 'nullable|string',
            'city' => 'nullable|string',
            'pincode' => 'nullable|string',
            'website' => 'nullable|url',
            'company_name' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = User::find(Auth::id());

        // Handle Profile Photo Upload
        $profilePhotoPath = null;
        if ($request->hasFile('profile_photo')) {
            $profilePhotoPath = $request->file('profile_photo')->store('profile-photos', 'public');
        }

        // Create user
        $user = $user->update([
            'name' => $request->name,
            'profile_photo' => $profilePhotoPath ? Storage::url($profilePhotoPath) : $user->profile_photo,
            'address' => $request->address,
            'country' => $request->country,
            'state' => $request->state,
            'district' => $request->district,
            'city' => $request->city,
            'pincode' => $request->pincode,
            'website' => $request->website,
            'company_name' => $request->company_name,
        ]);

        return response()->json([
            'message' => 'Profile Update successfully.',
            'user' => User::find(Auth::id())
        ], 201);
    }

    public function getMember($id){
        $user = User::find($id);
        return response()->json([
            'user' => $user
        ], 201);
    }

    public function resendOtp(Request $request)
    {
        $user = User::find($request->id);

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        $data = [];
        if ($request->type == 'email') {
            $data['email_otp'] = $email_otp;
            Mail::to($user->email)->send(new EmailOTP($email_otp));
        }
        if ($request->type == 'phone') {
            $data['phone_otp'] = $mobile_otp;
            // CommonHelpers::sendOtp($user->phone, $mobile_otp);
        }

        $user = $user->update($data);
        return response()->json([
            'status' => true,
            'message' => 'Otp Has Been Sent!',
        ], 201);
    }

    public function memberDetailsSave(Request $request)
    {
        $user = User::find($request->user_id);
        $rules = [];
        $data = [];

        $email_otp = random_int(111111, 999999);
        $mobile_otp = random_int(111111, 999999);

        if ($request->su_type === 'emailMobileChange') {
            $rules['email'] = 'email|uniques:user,email';
            $rules['phone'] = 'unique:users,phone';

            if (isset($request->email)) {
                $data['email'] = $request->email;
                $data['email_otp'] = $email_otp;
            }
            if (isset($request->phone)) {
                $data['phone'] = $request->phone;
                $data['mobile_otp'] = $mobile_otp;
            }
        }


        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Data not found',
            ], 201);
        }

        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        $user = $user->update($data);
        if ($user) {

            if ($request->su_type === 'emailMobileChange') {
                if (isset($request->email)) {
                    Mail::to($request->email)->send(new EmailOTP($email_otp));
                }
                if (isset($request->phone)) {
                    CommonHelpers::sendOtp($request->phone, $mobile_otp);
                }
            }

            return response()->json([
                'status' => true,
                'message' => 'Data Saved',
                'data'=> User::find($request->user_id),
            ], 201);
        }
    }

}
