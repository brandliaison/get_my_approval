<?php

namespace App\Http\Controllers\Operations;

use App\Http\Controllers\Controller;
use App\Models\OP\EntityRevision;
use App\Models\OP\Service;
use App\Models\OP\ServiceSection;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ServiceSectionsController extends Controller
{
    // Get all services
    public function index()
    {
        return response()->json(ServiceSection::get());
    }

    // Store a new service
    public function store(Request $request)
    {
        $service = Service::find($request->service_id);

        if ($service->status !== 'active') {
            return response()->json(['error' => 'Service Not Found'], 404);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'service_id' => 'required|exists:services,_id',
            'image_url' => 'nullable',
            'image_alt' => 'nullable|string|max:255',
            'content' => 'nullable|string',
        ]);

        $validated['slug'] = isset($request->slug) ? $request->slug : Str::slug($request->name);
        $validated['status'] = 'inactive';

        $service = ServiceSection::create($validated);
        if ($service) {
            EntityRevision::create([
                'entity_type' => 'ServiceSection',
                'entity_id' => $service->_id,
                'old_data' => null,
                'new_data' => $service->with('category')->find($service->_id),
                'revised_by' => Auth::user()->_id ?? 'System', // Track the reviser
                'from_platform' => 'operations',
            ]);
        }

        return response()->json($service, 201);
    }
}
