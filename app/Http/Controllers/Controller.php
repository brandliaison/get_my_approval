<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function successResponse($data = null, $message = 'Success', $code = 200)
    {
        return response()->json([
            'message' => $message,
            'data'    => $data,
        ], $code);
    }

    public function errorResponse($message = 'Error', $error = null, $code = 500)
    {
        return response()->json([
            'message' => $message,
            'error'   => $error,
        ], $code);
    }

}
