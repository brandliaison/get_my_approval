<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\ServicePartner;
use Illuminate\Http\Request;

class ServicePartnerController extends Controller
{
    public function index(){
        $data = ServicePartner::get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function show($id){
        $data = ServicePartner::find($id);

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }
        $data->skills = $data->getSkillsWithServices();

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
