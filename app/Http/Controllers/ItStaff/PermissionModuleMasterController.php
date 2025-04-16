<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\IT\PermissionModuleMaster;
use Illuminate\Database\QueryException;
use Exception;

class PermissionModuleMasterController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $modules = PermissionModuleMaster::all();
            return response()->json([
                'message' => 'Modules retrieved successfully.',
                'data' => $modules
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'module_name' => 'required|string|max:255',
            ]);
    
            $module = PermissionModuleMaster::updateOrCreate(
                ['module_name' => $validated['module_name']],
                ['module_name' => $validated['module_name']]
            );
            return response()->json([
                'message' => $module->wasRecentlyCreated ? 'Module created successfully.' : 'Module updated successfully.',
                'data' => $module
            ], $module->wasRecentlyCreated ? 201 : 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database error occurred.',
                'message' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $e->getMessage()
            ], 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $module = PermissionModuleMaster::findOrFail($id);
            return response()->json([
                'message' => 'Module retrieved successfully.',
                'data' => $module
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Module not found.',
                'message' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
          
            $validated = $request->validate([
                'module_name' => 'required|string|max:255',
            ]);
            $module = PermissionModuleMaster::findOrFail($id);
            $module->update([
                'module_name' => $validated['module_name'],
            ]);

            return response()->json([
                'message' => 'Module updated successfully.',
                'data' => $module
            ], 200);
        } catch (QueryException $e) {
            return response()->json([
                'error' => 'Database error occurred.',
                'message' => $e->getMessage()
            ], 500);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'An unexpected error occurred.',
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $module = PermissionModuleMaster::findOrFail($id);
            $module->delete();
            return response()->json([
                'message' => 'Module deleted successfully.'
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'error' => 'Module not found.',
                'message' => $e->getMessage()
            ], 404);
        }
    }
}
