<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Notification;
use App\Models\OP\NotificationCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(Notification::with('category', 'revisions')->get());
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $notificationCat = NotificationCategory::find($request->notification_category_id);

        if (!$notificationCat || $notificationCat->status !== 'active') {
            return response()->json(['error' => 'Notification Category Not Found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'notification_category_id' => 'required|exists:notification_categories,_id',
            'image_url' => 'nullable',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
        ]);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('notification', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $validated['slug'] = isset($request->slug) ? $request->slug : Str::slug($request->name);
        $validated['status'] = 'inactive';

        $notification = Notification::create($validated);
        if ($notification) {
            EntityRevision::create([
                'entity_type' => 'Notification',
                'entity_id' => $notification->_id,
                'old_data' => null,
                'new_data' => $notification->with('category')->find($notification->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($notification, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $notification = Notification::find($id);
        if (!$notification) {
            return response()->json(['error' => 'Notification Not Found'], 404);
        }
        return response()->json($notification->load('category', 'revisions'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $notificationCat = NotificationCategory::find($request->notification_category_id);

        $notification = Notification::with('category')->find($id);
        $oldnotification = clone $notification;

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'notification_category_id' => 'required|exists:notification_categories,_id',
            'image_url' => 'sometimes|url',
            'image_alt' => 'nullable|string|max:255',
            'description' => 'nullable|string',
            'compliance_header' => 'nullable|string',
        ]);

        if ($notificationCat->status !== 'active') {
            return response()->json(['error' => 'Notification Category Not Found'], 404);
        }

        if (!$notification) {
            return response()->json(['error' => 'Notification Not Found'], 404);
        }

        $validated['slug'] = isset($request->slug) ? $request->slug : Str::slug($request->name);

        $validated = $request->except('image_url');
        if ($request->hasFile('image_url')) {
            $filePath = $request->file('image_url')->store('notification', 'public');
            $validated['image_url'] = Storage::url($filePath);
        }

        $notification->update($validated);

        if ($notification) {
            EntityRevision::create([
                'entity_type' => 'Notification',
                'entity_id' => $notification->_id,
                'old_data' => $oldnotification,
                'new_data' => Notification::with('category')->find($notification->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($notification);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $notification = Notification::find($id);
        $notification->delete();
        return response()->json(['message' => 'Notification deleted successfully']);
    }
}
