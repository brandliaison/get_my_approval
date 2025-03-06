<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\ServiceCategory;
use App\Models\OP\ServiceCategoryReview;
use App\Models\OP\ServiceCategoryRevision;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ServiceCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ServiceCategory::with('firstAppoveruser', 'finalAppoveruser')->get(), 200);
    }

    // Store (Create) a New Service Category
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = ServiceCategory::create([
            'name' => $request->name,
            'slug' => isset($request->slug) ? $request->slug : Str::slug($request->name), // Generate slug automatically
            'description' => $request->description,
            'title' => $request->title,
            'from_platform' => 'operations',
            'approval_status' => 'submitted',
            'status' => 'inactive',
        ]);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'ServiceCategory',
                'entity_id' => $category->id,
                'old_data' => null,
                'new_data' => $request->all(),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }
        return response()->json($category, 201);
    }

    // Show a Single Service Category
    public function show($id)
    {
        $category = ServiceCategory::with('firstAppoveruser', 'finalAppoveruser')->where('slug', $id)->first();

        if (!$category) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
        }

        return response()->json($category, 200);
    }

    // Update a Service Category
    public function update(Request $request, $id)
    {
        $oldcategory = ServiceCategory::select('_id', 'name', 'slug', 'description', 'title', 'created_at')->find($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable',
            'title' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (!$oldcategory) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? $request->slug : Str::slug($request->name);
        // Update category
        $category = $oldcategory->update([
            'name' => $request->name ?? $oldcategory->name,
            'slug' => $request->slug ? $request->slug : $oldcategory->slug,
            'description' => $request->description ?? $oldcategory->description,
            'title' => $request->title ?? $oldcategory->title,
        ]);

        unset($validated['_method']);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'ServiceCategory',
                'entity_id' => $category->id,
                'old_data' => $oldcategory,
                'new_data' => $validated,
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }


        return response()->json($category, 200);
    }

    // Delete a Service Category
    public function destroy($id)
    {
        $category = ServiceCategory::find($id);

        if (!$category) {
            return response()->json(['error' => 'Service Category Not Found'], 404);
        }

        $category->delete();

        return response()->json(['message' => 'Service Category Deleted Successfully'], 200);
    }

    // Fetch all Revisions for a category
    public function getRevisions($categoryId)
    {
        $serviceCategory = ServiceCategory::find($categoryId);

        if (!$serviceCategory) {
            return response()->json(['message' => 'Service Category not found'], 404);
        }

        return response()->json($serviceCategory->revisions()->get());
    }

    // Fetch all Revisions Single for a category
    public function getRevision($categoryId, $revisionId)
    {
        $review = ServiceCategoryRevision::where('service_category_id', $categoryId)
            ->where('_id', $revisionId)
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        return response()->json($review);
    }

    public function addReview(Request $request)
    {
        $serviceCategoryRevision = ServiceCategoryRevision::find($request->revision_id);
        $serviceCategory = ServiceCategory::find($serviceCategoryRevision->serviceCategory->_id);

        if (!$serviceCategoryRevision) {
            return response()->json(['message' => 'Service Category Revision not found'], 404);
        }

        $validated = $request->validate([
            'review_status' => 'required|in:approved,rejected,changes_required',
            'review_comment' => 'nullable|string',
        ]);

        // Save the review in `service_category_reviews` table
        $review = ServiceCategoryReview::create([
            'reviewed_by' => Auth::id(),
            'service_category_id' => $serviceCategoryRevision->serviceCategory->_id,
            'service_category_revision_id' => $request->revision_id,
            'review_status' => $validated['review_status'],
            'review_comment' => $validated['review_comment'],
            'from_platform' => 'operations',
        ]);

        if ($request->review_status == 'rejected') {
            $serviceCategory->update(['approval_status' => 'rejected', 'first_approver' => Auth::id(), 'first_approved_date' => Carbon::now()->toDateTimeString()]);
            $serviceCategoryRevision->update(['status' => 'rejected']);
        }

        if ($request->review_status == 'approved') {
            if ($serviceCategory->approval_status  === 'partially_approved') {
                $serviceCategory->update(['approval_status' => 'Approved', 'status' => 'active', 'final_approver' => Auth::id(), 'final_approved_date' => Carbon::now()->toDateTimeString()]);
                $serviceCategoryRevision->update(['status' => 'Approved']);
            } else {
                $serviceCategory->update(['approval_status' => 'partially_approved', 'first_approver' => Auth::id(), 'first_approved_date' => Carbon::now()->toDateTimeString()]);
                $serviceCategoryRevision->update(['status' => 'Approved']);
            }
        }

        return response()->json([
            'message' => 'Review added successfully',
            'review' => $review,
        ]);
    }

    // Fetch all reviews for a category
    public function getReviews(string $categoryId)
    {
        $serviceCategory = ServiceCategory::find($categoryId);

        if (!$serviceCategory) {
            return response()->json(['message' => 'Service Category not found'], 404);
        }

        return response()->json($serviceCategory->reviews()->get());
    }

    // Fetch all reviews for a category
    public function getReview($reviewId)
    {
        $review = ServiceCategoryReview::where('_id', $reviewId)
            ->first();

        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        return response()->json($review);
    }
}
