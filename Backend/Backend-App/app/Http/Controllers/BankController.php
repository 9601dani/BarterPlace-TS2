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

    public function updateAplicationCurrency2(string $username, string $total_cost)
    {
        $bank = Bank::query()->where('username', $username)->first();
        $bank->aplication_currency -= $total_cost;
        $bank->save();
    }
    public function updateAplicationCurrency3(string $username, string $total_cost)
    {
        $bank = Bank::query()->where('username', $username)->first();
        $bank->aplication_currency += $total_cost;
        $bank->save();
    }

    public function updateRealMoney(string $username, string $amount)
    {
        $bank = Bank::query()->where('username', $username)->first();
        $bank->money += $amount;
        $bank->save();
    }

    public function updateBuyPack(string $username, string $price, string $coins)
    {
        $bank = Bank::query()->where('username', $username)->first();
        $bank->money -= $price;
        $bank->aplication_currency += $coins;
        $bank->save();
    }

    public function returnMoneyIfBlocked(string $username, string $currency){
        $bank = Bank::query()->where('username', $username)->first();
        $bank->aplication_currency += $currency_return;
        $bank->save();
    }

    public function transferUsers(string $username_sender, string $username_receiver, string $amount)
    {
        $bank_sender = Bank::query()->where('username', $username_sender)->first();
        $bank_receiver = Bank::query()->where('username', $username_receiver)->first();
        $bank_sender->aplication_currency -= $amount;
        $bank_receiver->aplication_currency += $amount;
        $bank_sender->save();
        $bank_receiver->save();
        return $bank_sender;
    }
    
}
