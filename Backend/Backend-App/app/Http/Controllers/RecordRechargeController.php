<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RecordRecharge;
use App\Http\Controllers\BankController;

class RecordRechargeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        $recordRecharge = RecordRecharge::query()
        ->where('username', $request->username)
        ->get();
        return $recordRecharge;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'date' => 'required',
            'amount' => 'required',
            'type' => 'required',
            'number' => 'required',
            'username' => 'required'
        ]);
        $recordRecharge = new RecordRecharge;
        $recordRecharge->date = $request->date;
        $recordRecharge->amount = $request->amount;
        $recordRecharge->type = $request->type;
        $recordRecharge->number = $request->number;
        $recordRecharge->username = $request->username;
        $recordRecharge->save();

        $add_bank = new BankController;
        $add_bank->updateRealMoney($request->username, $request->amount);

        return $recordRecharge;

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
