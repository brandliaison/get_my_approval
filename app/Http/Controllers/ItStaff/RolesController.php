<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::where('guard_name', 'itstaff')->get();
        return response()->json(['message' => 'Data Success', 'data' => $roles], 201);
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
        $role = Role::create(['name' => $request->role_name, 'guard_name' => 'itstaff']);
        return response()->json(['message' => 'Data Success', 'data' => $role], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);
        if (!$role) {
            return response()->json(['message' => 'Role Not Found'], 404);
        }

        $role->delete();
        return response()->json(['message' => 'Role Deleted']);
    }

    public function permissions(Request $request) {
        $permissions = Permission::where('guard_name', 'itstaff')->get();
        return response()->json(['message' => 'Data Success', 'data' => $permissions], 201);
    }

    public function permissionsByRole(string $id) {
        $role = Role::find($id);
        return response()->json(['message' => 'Data Success', 'data' => $role->permissions], 201);
    }

    public function createPermissions(Request $request) {
        $role = Role::find($request->role_id);
        $permissions = $request->name;
        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }
        $role->givePermissionTo($permissions);
        return response()->json(['message' => 'Data Success', 'data' => $role], 201);
    }

    public function assignPermissions(Request $request) {
        $role = Role::find($request->role_id);
        $permissions = $request->name;
        $role->permissions()->detach();
        $role->syncPermissions($permissions);
        return response()->json(['message' => 'Data Success', 'data' => $role->permissions], 201);
    }
}
