<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\Blog;
use App\Models\OP\Notification;
use App\Models\OP\Product;
use App\Models\OP\Service;
use App\Models\OP\TutorialVideo;
use Illuminate\Http\Request;

class RelationController extends Controller
{
    public function attachServiceRelations(Request $request, $serviceId)
    {
        if ($request->fromType === 'services') {
            $service = Service::findOrFail($serviceId);
        }

        if ($request->fromType === 'products') {
            $service = Product::findOrFail($serviceId);
        }

        if ($request->fromType === 'notification') {
            $service = Notification::findOrFail($serviceId);
        }

        if ($request->fromType === 'tutorials') {
            $service = TutorialVideo::findOrFail($serviceId);
        }

        if ($request->fromType === 'blogs') {
            $service = Blog::findOrFail($serviceId);
        }

        $validated = $request->validate([
            'id' => 'array',
        ]);

        // Sync all relationships
        if ($request->type === 'notification') {
            $service->notifications()->attach($validated['id']);
        }

        if ($request->type === 'products') {
            $service->products()->attach($validated['id']);
        }

        if ($request->type === 'tutorials') {
            $service->tutorials()->attach($validated['id']);
        }

        if ($request->type === 'blogs') {
            $service->blogs()->attach($validated['id']);
        }

        if ($request->type === 'services') {
            $service->services()->attach($validated['id']);
        }

        return response()->json([
            'message' => 'Relations synced successfully',
            'service' => $service,
        ]);
    }

    public function detachServiceRelations(Request $request, $serviceId)
    {
        if ($request->fromType === 'services') {
            $service = Service::findOrFail($serviceId);
        }

        if ($request->fromType === 'products') {
            $service = Product::findOrFail($serviceId);
        }

        if ($request->fromType === 'notification') {
            $service = Notification::findOrFail($serviceId);
        }

        if ($request->fromType === 'tutorials') {
            $service = TutorialVideo::findOrFail($serviceId);
        }

        if ($request->fromType === 'blogs') {
            $service = Blog::findOrFail($serviceId);
        }

        $validated = $request->validate([
            'id' => 'array',
        ]);

        // Sync all relationships
        if ($request->type === 'notification') {
            $service->notifications()->detach($validated['id']);
        }

        if ($request->type === 'products') {
            $service->products()->detach($validated['id']);
        }

        if ($request->type === 'tutorials') {
            $service->tutorials()->detach($validated['id']);
        }

        if ($request->type === 'blogs') {
            $service->blogs()->detach($validated['id']);
        }

        if ($request->type === 'services') {
            $service->services()->detach($validated['id']);
        }

        return response()->json([
            'message' => 'Relations synced successfully',
            'service' => $service,
        ]);
    }
}
