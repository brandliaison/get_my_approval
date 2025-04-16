<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\Operations\BlogCategoryController;
use App\Http\Controllers\Operations\BlogController;
use App\Http\Controllers\Operations\CarrerController;
use App\Http\Controllers\Operations\EnquiryController;
use App\Http\Controllers\Operations\NotificationCategoryController;
use App\Http\Controllers\Operations\NotificationController;
use App\Http\Controllers\Operations\ProductCategoryController;
use App\Http\Controllers\Operations\ProductController;
use App\Http\Controllers\Operations\RequestCallbackController;
use App\Http\Controllers\Operations\ServiceCategoryController;
use App\Http\Controllers\Operations\ServiceController;
use App\Http\Controllers\Operations\TutorialVideoCategoryController;
use App\Http\Controllers\Operations\TutorialVideoController;
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

// active data

Route::get('active-service-categories', [ServiceCategoryController::class, 'activeServiceCategories']);
Route::get('active-services', [ServiceController::class, 'activeServices']);
Route::get('active-services-by-category/{slug}', [ServiceController::class, 'servicesByCategory']);
Route::get('active-service-details/{slug}', [ServiceController::class, 'serviceDetails']);

// Notification
Route::get('active-notification-categories', [NotificationCategoryController::class, 'activeNotificationCategories']);
Route::get('active-notifications', [NotificationController::class, 'activeNotifications']);
Route::get('active-notifications-by-category/{slug}', [NotificationController::class, 'notificationsByCategory']);
Route::get('active-notification-details/{slug}', [NotificationController::class, 'notificationDetails']);

// Tutorials
Route::get('active-tutorial-videos-categories', [TutorialVideoCategoryController::class, 'activeTutorialVideoCategories']);
Route::get('active-tutorials', [TutorialVideoController::class, 'activeTutorials']);
Route::get('active-tutorials-by-category/{slug}', [TutorialVideoController::class, 'tutorialsByCategory']);
Route::get('active-tutorial-details/{slug}', [TutorialVideoController::class, 'tutorialDetails']);

// Blogs
Route::get('active-blog-categories', [BlogCategoryController::class, 'activeBlogCategories']);
Route::get('active-blog', [BlogController::class, 'activeBlogs']);
Route::get('active-blogs-by-category/{slug}', [BlogController::class, 'blogsByCategory']);
Route::get('active-blog-details/{slug}', [BlogController::class, 'blogDetails']);

// Products
Route::get('active-product-categories', [ProductCategoryController::class, 'activeProductCategories']);
Route::get('active-product', [ProductController::class, 'activeProducts']);
Route::get('active-products-by-category/{slug}', [ProductController::class, 'productsByCategory']);
Route::get('active-product-details/{slug}', [ProductController::class, 'productDetails']);

// IT Staff APIs
require('api_it.php');
require('api_op.php');
require('api_partner.php');
