<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\AccountBank;
class AccountBankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $username)
    {
        //
        $accountBank = AccountBank::query()
            ->where('username', $username)
            ->get();
        return $accountBank;
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
            'bank' => 'required',
            'type' => 'required',
            'username' => 'required'
        ]);

        $accountBank = new AccountBank;
        $accountBank->number = $request->number;
        $accountBank->name = $request->name;
        $accountBank->bank = $request->bank;
        $accountBank->type = $request->type;
        $accountBank->username = $request->username;
        $accountBank->save();
        return $accountBank;
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
        $accountBank = AccountBank::query()
            ->where('id', $id)
            ->update($request->all());
        return $accountBank;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
        $accountBank = AccountBank::query()
            ->where('id', $id)
            ->delete();
        return $accountBank;
    }
}
