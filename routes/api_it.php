<?php

use App\Http\Controllers\ItStaff\AuthController;
use App\Http\Controllers\ItStaff\DesginationController;
use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\ItStaff\WebsiteSettingsController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/it-admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(['auth:itstaff'])->group(function () {
        Route::post('logout', [AuthController::class, 'logout']);

        // IT designation
        Route::apiResource('designation', DesginationController::class);

        // IT Staff
        Route::apiResource('it-staff', StaffController::class);

        // Website Settings
        Route::apiResource('website-setting', WebsiteSettingsController::class);
    });
});

