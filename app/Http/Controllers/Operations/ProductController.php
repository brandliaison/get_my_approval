<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Product;
use App\Models\OP\ProductCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Product::with('category')->where(function ($query) {
            $query->where('status', 'active')
                ->orWhere('created_by', Auth::id());
        })->with('category')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $category = ProductCategory::find($request->product_category_id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'product_category_id' => 'required|exists:product_categories,_id',
            'image_url' => 'nullable|mimes:png,jpg,jpeg',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'technical_name' => 'nullable|string',
            'compliance_header' => 'nullable|string',
            'open_comment' => 'nullable|string',
        ]);

        // if ($category->status !== 'active') {
        //     return response()->json(['error' => 'Product Category Not Found'], 404);
        // }

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('products', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);
        $validated['status'] = 'inactive';
        $validated['approval_status'] = 'submitted';
        $validated['created_by'] = Auth::user()->_id;

        $data = Product::create($validated);
        if ($data) {
            EntityRevision::create([
                'entity_type' => 'Product',
                'entity_id' => $data->_id,
                'old_data' => null,
                'new_data' => $data->with('category')->find($data->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($data, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $data = Product::with('category', 'revisions.reviews', 'services', 'tutorials', 'blogs', 'notifications')->find($id);
        if (!$data) {
            return response()->json(['error' => 'Product Not Found'], 404);
        }
        return response()->json($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = ProductCategory::find($request->product_category_id);

        $data =  Product::with('category')->find($id);
        $oldData = clone $data;

        $rules = [
            'name' => 'required|string|max:255',
            'product_category_id' => 'required|exists:product_categories,_id',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'content' => 'nullable|string',
            'technical_name' => 'nullable|string',
            'compliance_header' => 'nullable|string',
            'open_comment' => 'nullable|string',
        ];

        if ($request->hasFile('image_url')) {
            $rules = [
                'image_url' => 'nullable|mimes:png,jpg,jpeg',
            ];
        }
        $validated = $request->validate($rules);

        // if ($category->status !== 'active') {
        //     return response()->json(['error' => 'Product Category Not Found'], 404);
        // }

        if (!$data) {
            return response()->json(['error' => 'Product Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? Str::slug($request->slug) : Str::slug($request->name);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('products', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $data->update($validated);

        if ($data) {
            EntityRevision::create([
                'entity_type' => 'Product',
                'entity_id' => $data->_id,
                'old_data' => $oldData,
                'new_data' => Product::with('category')->find($data->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($data);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $data = Product::find($id);
        if (!$data) {
            return response()->json(['error' => 'Product Not Found'], 404);
        }
        $data->delete();
        return response()->json(['message' => 'Product deleted successfully']);
    }

    public function activeProducts()
    {
        $data = Product::where('status', 'active')->with('category', 'createdByUser')->get();

        if (!count($data) > 0) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function productsByCategory($slug)
    {

        $cat = ProductCategory::where('slug', $slug)->where('status', 'active')->first();
        $data = Product::with('category')->where('product_category_id', $cat->_id)->where('status', 'active')->get();

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }

    public function productDetails($slug)
    {
        $data = Product::with('services', 'tutorials', 'blogs', 'notifications')->where('slug', $slug)->where('status', 'active')->first();

        if (!$data) {
            return response()->json(['data' => [], 'message' => 'Data Not Found'], 200);
        }

        return response()->json(['data' => $data, 'message' => 'Data Found'], 200);
    }
}
