<?php


use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\Operations\AuthController;
use App\Http\Controllers\Operations\DesignationController;
use App\Http\Controllers\Operations\EntityReviewController;
use App\Http\Controllers\Operations\OpStaffController;
use App\Http\Controllers\Operations\ServiceCategoryController;
use App\Http\Controllers\Operations\ServiceController;
use App\Http\Controllers\Operations\ServiceSectionsController;
use App\Http\Middleware\MultiAuthMiddleware;
use Illuminate\Support\Facades\Route;

Route::prefix('v1/op-admin')->group(function () {
    Route::post('login', [AuthController::class, 'login']);

    Route::middleware(MultiAuthMiddleware::class)->group(function () {
        Route::apiResource('operations-designation', DesignationController::class);
        Route::apiResource('op-staff', OpStaffController::class);
        Route::post('/change-password', [StaffController::class, 'changePassword']);
        Route::post('/change-staff-password', [StaffController::class, 'changeStaffPassword']);
        Route::post('/change-staff-status', [StaffController::class, 'changeStaffStatus']);
    });

    Route::middleware(['auth:opstaff'])->group(function () {
        // Service Category
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::get('service-categories/{serviceCategory}/revisions', [ServiceCategoryController::class, 'getRevisions']);
        Route::get('service-categories/{serviceCategory}/revision/{id}', [ServiceCategoryController::class, 'getRevision']);
        Route::post('service-categories/review', [ServiceCategoryController::class, 'addReview']);
        Route::get('service-categories/reviews/{serviceCategory}', [ServiceCategoryController::class, 'getReviews']);
        Route::get('service-categories/review/{id}', [ServiceCategoryController::class, 'getReview']);

        // Services Data
        Route::apiResource('services', ServiceController::class);
        // Service Section
        Route::apiResource('services-sections', ServiceSectionsController::class);

        // Get entity revisions
        Route::post('entity-revisions', [EntityReviewController::class, 'getRevisions']);
        Route::get('entity-revision/{id}', [EntityReviewController::class, 'getRevision']);
        Route::post('add-review', [EntityReviewController::class, 'addReview']);

    });
});
