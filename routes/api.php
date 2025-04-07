<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Operations\CarrerController;
use App\Http\Controllers\Operations\EnquiryController;
use App\Http\Controllers\Operations\RequestCallbackController;
use App\Http\Controllers\Operations\ServiceCategoryController;
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

Route::post('register-service-partner', [HomeController::class, 'registerServicePartner']);
Route::post('resend-service-partner-otp', [HomeController::class, 'resendServicePartnerOtp']);
Route::post('verify-service-partner-otp', [HomeController::class, 'verifyServicePartnerOtp']);
Route::get('get-service-partner/{id}', [HomeController::class, 'getServicePartner']);
Route::post('service-partner-details-save', [HomeController::class, 'servicePartnerDetailsSave']);

Route::post('register-channel-partner', [HomeController::class, 'registerChannelPartner']);
Route::post('resend-channel-partner-otp', [HomeController::class, 'resendChannelPartnerOtp']);
Route::post('verify-channel-partner-otp', [HomeController::class, 'verifyChannelPartnerOtp']);
Route::get('get-channel-partner/{id}', [HomeController::class, 'getChannelPartner']);
Route::post('channel-partner-details-save', [HomeController::class, 'channelPartnerDetailsSave']);

Route::get('active-jobs', [CarrerController::class, 'getActiveJobs']);
Route::post('apply-jobs', [CarrerController::class, 'applyJob']);

// IT Staff APIs
require('api_it.php');
require('api_op.php');
require('api_partner.php');
