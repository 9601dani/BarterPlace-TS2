<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Publication;

class PublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return Publication::query()
        -> where('status', 'active')
        ->get();
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
            'date' => 'required',
            'status' => 'required',
            'username' => 'required',
            'foto' => 'required',
            'total_cost' => 'required',
            'publication_type_id' => 'required',
            'category' => 'required',
            'unit_price' => 'required',
            'quantity' => 'required'
        ]);
        
        $publication = new Publication;
        $publication->title = $request->title;
        $publication->description = $request->description;
        $publication->date = $request->date;
        $publication->status = $request->status;
        $publication->username = $request->username;
        $publication->foto = $request->foto;
        $publication->total_cost = $request->total_cost;
        $publication->publication_type_id = $request->publication_type_id;
        $publication->category = $request->category;
        $publication->unit_price = $request->unit_price;
        $publication->quantity = $request->quantity;
        $publication->quantity_stock = $request->quantity;
        $publication->save();

        /**descontare del bank si es de tipo voluntariado o venta */
        if($publication->publication_type_id == 3){
            $bank = new BankController;
            $bank->updateAplicationCurrency2($request->username, $publication->total_cost);
        }    
        return $publication;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        return Publication::query()
        ->where('username', $id)
        //->where('status','!=', 'inactive')
        ->get();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $publication = Publication::find($id);
        $publication->title = $request->title;
        $publication->description = $request->description;
        $publication->date = $request->date;
        $publication->status = $request->status;
        $publication->username = $request->username;
        $publication->foto = $request->foto;
        $publication->total_cost = $request->total_cost;
        $publication->publication_type_id = $request->publication_type_id;
        $publication->category = $request->category;
        $publication->unit_price = $request->unit_price;
        $publication->quantity = $request->quantity;
        $publication->quantity_stock = $request->quantity_stock;
        $publication->save();
        return $publication;
        
    }
    public function updateStatus(Request $request, string $id)
    {
        //
        $publication = Publication::find($id);
        $publication->status = $request->status;
        $publication->save();

        if($request->status == 'rejected'){
            $bank = new BankController;
            $bank->updateAplicationCurrency3($publication->username, $publication->total_cost);
        }
        return $publication;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function publicationsP()
    {
        return Publication::query()->where('status', 'pending')->get();
    }

    public function reenviarPublication(string $id)
    {
        $publication = Publication::find($id);
        $publication->status = 'pending';
        $publication->save();
        if($publication->publication_type_id == 3){
            $bank = new BankController;
            $bank->updateAplicationCurrency2($publication->username, $publication->total_cost);
        }
        return $publication;
    }

    public function inactivePublication(int $id)
    {
        $publication = Publication::find($id);
        $publication->status = 'inactive';
        $publication->save();
        return $publication;
    }

    public function getPublicationsMain(string $username)
    {
        return Publication::query()
        ->where('status', 'active')
        ->where('username', '!=', $username)
        ->get();
    }

    public function publicationsByCategory(string $category)
    {
        return Publication::query()
        ->where('status', 'active')
        ->where('category', $category)
        ->limit(25)
        ->get();
    }

    public function comprobarNumeroPublicaciones(string $username)
    {
        return Publication::query()
        ->where('username', $username)
        ->whereIn('status', ['active', 'completed'])
        ->count();
    }

    public function blockPublication(string $id)
    {
        $publication = Publication::find($id);
        $publication->status = 'bloqueada';
        $publication->save();
        return $publication;
    }

}
