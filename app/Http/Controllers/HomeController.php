<?php

namespace App\Http\Controllers;

use App\Models\IT\WebsiteSetting;
use App\Models\OP\Blog;
use App\Models\OP\TutorialVideo;
use Illuminate\Http\Request;

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
}
