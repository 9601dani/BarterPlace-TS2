<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestSeller;
use App\Models\client;

class RequestSellerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $requestSeller = RequestSeller::query()
            ->where('status', 'pending')
            ->get();
        return $requestSeller;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'username' => 'required',
            'status' => 'required'
        ]);
        $requestSeller = new RequestSeller;
        $requestSeller->username = $request->username;
        $requestSeller->status = $request->status;
        $requestSeller->save();

    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        //
        $username = RequestSeller::query()
            ->where('username', $username)
             ->where('status', 'pending')
            ->first();
        return $username;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $username)
    {
        //actualizar el estado de la solicitud
        $requestSeller = RequestSeller::query()
            ->where('username', $username)
            ->where('status', 'pending')
            ->first();
        if($requestSeller){
            $requestSellerId = $requestSeller->id;

        // Actualizar el estado de la solicitud utilizando el ID obtenido
            $updated = RequestSeller::where('id', $requestSellerId)
                                ->update(['status' => $request->status]);

            if($request->status == 'accepted'){
                // Si la solicitud es aceptada, se debe cambiar el rol del usuario a 'seller'
                $user = client::query()
                    ->where('username', $username)
                    ->first();
                $user->is_seller = 1;
                $user->save();
            }
        return $requestSeller;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
