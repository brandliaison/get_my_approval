<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(ProductCategory::get(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = ProductCategory::create([
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
                'entity_type' => 'ProductCategory',
                'entity_id' => $category->_id,
                'old_data' => null,
                'new_data' => $request->all(),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }
        return response()->json($category, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = ProductCategory::where('slug', $id)->first();

        if (!$category) {
            return response()->json(['error' => 'Product Category Not Found'], 404);
        }

        return response()->json($category, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ProductCategory::select('_id', 'name', 'slug', 'description', 'title', 'created_at')->find($id);
        $oldcategory = clone $category;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'description' => 'nullable',
            'title' => 'nullable|string',
            'slug' => 'nullable|string',
        ]);

        if (!$category) {
            return response()->json(['error' => 'Blog Category Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? $request->slug : Str::slug($request->name);
        // Update category
        $category->update([
            'name' => $request->name ?? $oldcategory->name,
            'slug' => $request->slug ? $request->slug : $oldcategory->slug,
            'description' => $request->description ?? $oldcategory->description,
            'title' => $request->title ?? $oldcategory->title,
        ]);

        if ($category) {
            EntityRevision::create([
                'entity_type' => 'ProductCategory',
                'entity_id' => $category->_id,
                'old_data' => $oldcategory,
                'new_data' => $category,
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($oldcategory = ProductCategory::find($id), 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = ProductCategory::find($id);

        if (!$category) {
            return response()->json(['error' => 'Product Category Not Found'], 404);
        }

        $category->delete();
        return response()->json(['message' => 'Product Category Deleted Successfully'], 200);
    }
}
