<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Bank;

class BankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(string $username)
    {
        //
        $bank = new Bank;
        $bank->volunteer_currency = 0;
        $bank->aplication_currency = 0;
        $bank->money = 0;
        $bank->username = $username;
        $bank->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        //aqui pondre el username a buscar
        
        return Bank::query()->where('username', $username)->first();
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

    public function updateAplicationCurrency(Request $request, string $username)
    {
        $bank = Bank::query()->where('username', $username)->first();
        $bank->aplication_currency = $request->aplication_currency;
        $bank->save();
        return $bank;
    }
}
