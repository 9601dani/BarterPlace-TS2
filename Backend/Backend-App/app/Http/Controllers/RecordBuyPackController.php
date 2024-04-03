<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecordBuyPack;
use App\Http\Controllers\BankController;

class RecordBuyPackController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $myRecordBuyPack = RecordBuyPack::query()
        ->where('username', $request->username)
        ->get();
        return $myRecordBuyPack;
    }
    

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'date' => 'required',
            'combo_name' => 'required',
            'price' => 'required',
            'coins' => 'required',
            'username' => 'required'
        ]);
        $recordBuyPack = new RecordBuyPack();
        $recordBuyPack->date = $request->date;
        $recordBuyPack->combo_name = $request->combo_name;
        $recordBuyPack->price = $request->price;
        $recordBuyPack->coins = $request->coins;
        $recordBuyPack->username = $request->username;
        $recordBuyPack->save();

        $bank = new BankController();
        $bank->updateBuyPack($request->username,$request->price, $request->coins);
        return $recordBuyPack;
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
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
