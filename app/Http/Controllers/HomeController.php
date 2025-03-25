<?php

namespace App\Http\Controllers;

use App\Models\IT\WebsiteSetting;
use App\Models\OP\Blog;
use App\Models\OP\TutorialVideo;
use App\Models\ServicePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class HomeController extends Controller
{
    public function index()
    {
        $data = [];
        $data['bannerData'] = WebsiteSetting::whereIn('key', ['banner_image', 'banner_text1', 'banner_text2'])->get();
        $data['tutorials'] = TutorialVideo::where('status', 'active')->select('_id', 'name', 'video_url', 'description', 'thumbnail_url', 'slug', 'status')->orderBy('created_at', 'desc')->get();
        $data['blogs'] = Blog::where('status', 'active')->select('_id', 'name', 'description', 'image_url', 'slug', 'status')->orderBy('created_at', 'desc')->get();

        return response()->json(['data' => $data], 200);
    }

    public function headerFooter()
    {
        $data = WebsiteSetting::get();
        return response()->json(['data' => $data], 200);
    }
    public function registerServicePartner(Request $request)
    {
        $rules = [
            'country' => 'required|in:India,Other',
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:service_partners,email',
            'mobile' => 'required|digits:10|unique:service_partners,mobile',
            'alt_mobile' => 'nullable|digits:10',
            'state' => 'required|string',
            'district' => 'required|string',
            'pincode' => 'required|string|max:10',
        ];

        // Validate the request
        $validator = Validator::make($request->all(), $rules);

        // Create user
        $user = ServicePartner::create([
            'name' => $request->name,
            'email' => $request->email,
            'mobile_number' => $request->mobile_number,
            'alt_mobile' => $request->alt_mobile,
            'country' => $request->country,
            'state' => $request->state,
            'district' => $request->district,
            'pincode' => $request->pincode,
            'email_otp' => random_int(111111,999999),
            'mobile_otp' => random_int(111111,999999),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Otp Sent On Email And Mobile',
            'user_id' => $user
        ], 201);
    }
}
