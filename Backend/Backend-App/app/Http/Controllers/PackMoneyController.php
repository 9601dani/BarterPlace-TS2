<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PackMoney;

class PackMoneyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return PackMoney::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'coins' => 'required'
        ]);
        $packMoney = new PackMoney;
        $packMoney->name = $request->name;
        $packMoney->price = $request->price;
        $packMoney->description = $request->description;
        $packMoney->coins = $request->coins;
        $packMoney->save();
        return $packMoney;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $validatedData = $request->validate([
            'id' => 'required',
            'name' => 'required',
            'price' => 'required',
            'description' => 'required',
            'coins' => 'required'
        ]);
        $packMoney = PackMoney::find($id);
        $packMoney->name = $request->name;
        $packMoney->price = $request->price;
        $packMoney->description = $request->description;
        $packMoney->coins = $request->coins;
        $packMoney->save();
        return $packMoney;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $packMoney = PackMoney::find($id);
        $packMoney->delete();
        return $packMoney;
    }
}
