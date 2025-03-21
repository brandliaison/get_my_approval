<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Operations\EnquiryController;
use App\Http\Controllers\Operations\RequestCallbackController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserTicketController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('/user')->controller(UserController::class)->group(function () {
    Route::post('/register', 'register');
    Route::post('/login', 'login');
    Route::post('/verify-phone', [UserController::class, 'verifyPhone']);
    Route::post('/verify-email', [UserController::class, 'verifyEmail']);

    Route::post('/forgot-password', [UserController::class, 'forgotPassword']);
    Route::post('/verify-reset-otp', [UserController::class, 'verifyResetOtp']);
    Route::post('/reset-password', [UserController::class, 'resetPassword']);
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::post('/update-profile', [UserController::class, 'updateProfile']);
        Route::apiResource('user-tickets', UserTicketController::class);
        Route::post('ticket-reply', [UserTicketController::class, 'replyTicket']);
        Route::post('ticket-update-status', [UserTicketController::class, 'updateStatus']);
    });
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Contact Enquiries
Route::post('enquiries', [EnquiryController::class, 'store']);

// Request callback
Route::post('request-callbacks', [RequestCallbackController::class, 'store']);

// Home
Route::get('home', [HomeController::class, 'index']);
Route::get('header-footer', [HomeController::class, 'headerFooter']);

// IT Staff APIs
require('api_it.php');
require('api_op.php');
