<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\ItStaff;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
    public function login(Request $request)
    {

        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);
        try {
            $user = ItStaff::where('email', $request->email)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                return $this->errorResponse('Invalid credentials.', '', 401);
            }
            if ($user->status == '0') {
                return $this->errorResponse('Profile is inactive.', '', 403);
            }
            // Generate token
            $token = $user->createToken('itstaff_token')->plainTextToken;
            $role = Role::where('name', $user->role)->where('guard_name', 'itstaff')->with('permissions')->first();
            return $this->successResponse([
                'token' => $token,
                'user' => $user,
                'permissions' => $role->permissions ?? [],
            ], 'Login successful');
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create Sub Admin.', $e->getMessage(), 500);
        }
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out']);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|unique:it_staff,email',
            'phone'    => 'required|string|max:15',
            'password' => 'required|string|min:6',
            'role' => 'required',
        ]);
        try {
            $staff = ItStaff::create([
                'name'              => $request->name,
                'email'             => $request->email,
                'phone'             => $request->phone,
                'password'          => Hash::make($request->password),
                'role'              => $request->role,
                'status'            => '1',
            ]);
            return $this->successResponse($staff, 'Sub Admin created successfully.', 201);
        } catch (\Exception $e) {
            return $this->errorResponse('Failed to create Sub Admin.', $e->getMessage(), 500);
        }
    }
}
