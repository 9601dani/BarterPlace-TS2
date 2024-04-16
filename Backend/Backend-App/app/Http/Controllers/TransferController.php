<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tranfer;
use App\Models\Bank;

class TransferController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $username)
    {
        //
        return Tranfer::query()->where('username_sender', $username)->get();

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'username_sender' => 'required',
            'username_receiver' => 'required',
            'amount' => 'required',
            'date' => 'required'
        ]);
        $tranfer = new Tranfer();
        $tranfer->username_sender = $request->username_sender;
        $tranfer->username_receiver = $request->username_receiver;
        $tranfer->amount = $request->amount;
        $tranfer->date = $request->date;
        $tranfer->save();
        //Ire a la tabla bank y actualizare el dinero del usuario que envia la transferencia
        $bank = new BankController();
        $bank->transferUsers($request->username_sender,$request->username_receiver, $request->amount);
        return $tranfer;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        //
        return Tranfer::query()->where('username_sender', $username)->get();
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
