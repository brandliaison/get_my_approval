<?php


use App\Http\Controllers\ItStaff\StaffController;
use App\Http\Controllers\Operations\AuthController;
use App\Http\Controllers\Operations\BlogCategoryController;
use App\Http\Controllers\Operations\BlogController;
use App\Http\Controllers\Operations\DesignationController;
use App\Http\Controllers\Operations\EntityReviewController;
use App\Http\Controllers\Operations\NotificationCategoryController;
use App\Http\Controllers\Operations\NotificationController;
use App\Http\Controllers\Operations\OpStaffController;
use App\Http\Controllers\Operations\ServiceCategoryController;
use App\Http\Controllers\Operations\ServiceController;
use App\Http\Controllers\Operations\ServiceSectionsController;
use App\Http\Controllers\Operations\TutorialVideoCategoryController;
use App\Http\Controllers\Operations\TutorialVideoController;
use App\Http\Controllers\Operations\PostCommentController;
use App\Http\Controllers\Operations\ProductCategoryController;
use App\Http\Controllers\Operations\ProductController;
use App\Http\Controllers\Operations\TicketController;
use App\Http\Controllers\Operations\TicketsCategoryController;
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
        // Services
        Route::apiResource('service-categories', ServiceCategoryController::class);
        Route::apiResource('services', ServiceController::class);
        Route::apiResource('services-sections', ServiceSectionsController::class);

        // Notifications
        Route::apiResource('notification-categories', NotificationCategoryController::class);
        Route::apiResource('notifications', NotificationController::class);

        // Tutorial Videos
        Route::apiResource('tutorial-videos-categories', TutorialVideoCategoryController::class);
        Route::apiResource('tutorial-videos', TutorialVideoController::class);

        // Blogs
        Route::apiResource('blog-categories', BlogCategoryController::class);
        Route::apiResource('blogs', BlogController::class);

        // Products
        Route::apiResource('product-categories', ProductCategoryController::class);
        Route::apiResource('products', ProductController::class);

        // Posts Comments
        Route::apiResource('post-comments', PostCommentController::class);

        // Approval Actions
        Route::post('post-comments/{id}/approve', [PostCommentController::class, 'approve']); // Approve comment
        Route::post('post-comments/{id}/reject', [PostCommentController::class, 'reject']); // Reject comment

        // Get entity revisions
        Route::post('entity-revisions', [EntityReviewController::class, 'getRevisions']);
        Route::get('entity-revision/{id}', [EntityReviewController::class, 'getRevision']);
        Route::post('add-review', [EntityReviewController::class, 'addReview']);

        // Tickets
        Route::apiResource('tickets-categories', TicketsCategoryController::class);
        Route::apiResource('tickets', TicketController::class);

    });
});
