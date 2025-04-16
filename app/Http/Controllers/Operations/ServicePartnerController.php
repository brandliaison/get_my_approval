<?php

namespace App\Http\Controllers\Operations;

use App\CommonHelpers\CommonHelpers;
use App\Http\Controllers\Controller;
use App\Mail\ServicePartnerApprovalMail;
use App\Models\ServicePartner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Mail;

class ServicePartnerController extends Controller
{

    public function index()
    {
        $response = CommonHelpers::partnerApiget('service-partners');
        return $response;
        if (!count($response) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $response, 'message' => 'Data Found'], 200);
    }

    public function show($id)
    {
        $response = CommonHelpers::partnerApiget('service-partner-details/'.$id);

        if (!$response) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $response, 'message' => 'Data Found'], 200);
    }

    public function approve($id)
    {
        $response = CommonHelpers::partnerApiget('service-partner-details/'.$id.'/approve');
        if (!$response) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $response, 'message' => 'Data Found'], 200);
    }

    public function reject($id)
    {
        $response = CommonHelpers::partnerApiget('service-partner-details/'.$id.'/reject');
        if (!$response) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $response, 'message' => 'Data Found'], 200);
    }
}
