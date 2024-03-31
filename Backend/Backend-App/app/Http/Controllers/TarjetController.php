<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tarjet;

class TarjetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $username)
    {
        //
        $tarjet = Tarjet::query()
            ->where('username', $username)
            ->get();
        return $tarjet;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'number' => 'required',
            'name' => 'required',
            'expiration' => 'required',
            'cvv' => 'required',
            'username' => 'required'
        ]);

        $tarjet = new Tarjet;
        $tarjet->number = $request->number;
        $tarjet->name = $request->name;
        $tarjet->expiration = $request->expiration;
        $tarjet->cvv = $request->cvv;
        $tarjet->username = $request->username;
        $tarjet->save();
        return $tarjet;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $tarjet = Tarjet::query()
            ->where('id', $id)
            ->update($request->all());
        return $tarjet;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $tarjet = Tarjet::query()
            ->where('id', $id)
            ->delete();
        return $tarjet;
    }
}
