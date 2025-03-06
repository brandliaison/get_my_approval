<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Contracts\Support\Jsonable;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'name' => 'required',
            'email' => 'required|unique:users,email',
            'password' => 'required'
        ]);

        $validate['password'] = Hash::make($request->password);
        $save = User::create($validate);

        if ($save) {
            return response()->json(['data' => $save, 'status' => true], 200);
        } else {
            return response()->json(['status' => false], 400);
        }
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
}
