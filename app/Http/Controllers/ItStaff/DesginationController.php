<?php

namespace App\Http\Controllers\ItStaff;

use App\Http\Controllers\Controller;
use App\Models\IT\ItDesignation;
use Illuminate\Http\Request;

class DesginationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $get = ItDesignation::get();

        return response()->json($get, 201);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate(
            [
                'name' => 'required',
            ],
            [
                'name.required' => 'Name field is required!'
            ]
        );

        $validated['status'] = 1;

        $save = ItDesignation::create($validated);

        return response()->json($save, 201);
    }

    /**
     * Display the specified resource.
     */

    public function show(string $id)
    {
        $itDesignation = ItDesignation::find($id);
        return response()->json($itDesignation, 201);
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
        $itDesignation = ItDesignation::find($id);

        if (isset($request->status)) {
            $rule = [
                'status' => 'required',
            ];
        } else {
            $rule = [
                'name' => 'required',
            ];
        }

        $validated = $request->validate($rule);
        $save = $itDesignation->update($validated);

        $itDesignation = ItDesignation::find($id);
        return response()->json($itDesignation, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $itDesignation = ItDesignation::find($id);
        $delete = $itDesignation->delete();
        return response()->json($delete, 201);
    }
}
