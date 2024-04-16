<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\PublicationCopy;
use App\Http\Controllers\BankController;
use App\Models\Publication;

class PublicationCopyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(string $username_buyer)
    {
        //
        $my_buys = PublicationCopy::query()
        -> where('username_buyer', $username_buyer)
        ->get();

        return $my_buys;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validatedData = $request->validate([
            'title' => 'required',
            'description' => 'required',
            'date_sell' => 'required',
            'username_seller' => 'required',
            'username_buyer' => 'required',
            'foto' => 'required',
            'total_cost' => 'required',
            'publication_type_id' => 'required',
            'category' => 'required',
            'unit_price' => 'required',
            'quantity' => 'required'
        ]);
        
        $publication_copy = new PublicationCopy;
        $publication_copy->title = $request->title;
        $publication_copy->description = $request->description;
        $publication_copy->date_sell = $request->date_sell;
        $publication_copy->username_seller = $request->username_seller;
        $publication_copy->username_buyer = $request->username_buyer;
        $publication_copy->foto = $request->foto;
        $publication_copy->total_cost = $request->total_cost;
        $publication_copy->publication_type_id = $request->publication_type_id;
        $publication_copy->category = $request->category;
        $publication_copy->unit_price = $request->unit_price;
        $publication_copy->quantity = $request->quantity;
        $publication_copy->save();

        /**descontare el dinero al usuario comprador*/

        if($publication_copy->publication_type_id == 1){
            $bank = new BankController;
            $bank->updateAplicationCurrency2($request->username_buyer, $publication_copy->total_cost);            
            $bank->updateAplicationCurrency3($request->username_seller, $publication_copy->total_cost);
        }else if($publication_copy->publication_type_id == 3){
            $bank = new BankController;
            $bank->updateAplicationCurrency4($request->username_buyer, $publication_copy->total_cost);
        }
        
        return $publication_copy;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username_seller)
    {
        //
        return PublicationCopy::query()
        ->where('username_seller',$username_seller)
        ->get();
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

    public function verificarParticipacionAnt(Request $request,string $id)
    {
        $publication_copy = PublicationCopy::query()
        ->where('title', $request->title)
        ->where('username_seller', $request->username_seller)
        ->where('username_buyer', $request->username_buyer)
        ->where('publication_type_id', $request->publication_type_id)
        ->where('category', $request->category)
        ->where('unit_price', $request->unit_price)
        ->where('quantity', $request->quantity)
        ->where('total_cost', $request->total_cost)
        ->get();

        if($publication_copy->isEmpty()){
            $publication = Publication::find($id);
            $publication->quantity_stock -= 1;

            if($publication->quantity_stock == 0){
                $publication->status = 'completed';
            }
            $publication->save();
        }
        
    }
}
