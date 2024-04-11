<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ReportPublication;
use App\Http\Controllers\PublicationController;
use App\Http\Controllers\BankController;

class ReportPublicationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        return ReportPublication::query()
        ->where('status', 'active')
        ->get();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validateData = $request->validate([
            'publication_id' => 'required',
            'title' => 'required',
            'description' => 'required',
            'foto' => 'required',
            'category' => 'required',
            'unit_price' => 'required',
            'username_publication' => 'required',
            'comment' => 'required',
            'date' => 'required',
            'status' => 'required',
            'username_report' => 'required'
        ]);
        $reportPublication = ReportPublication::create($validateData);
        return $reportPublication;
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

    public function changeStatus(Request $request, string $id)
    {
        $reportPublication = ReportPublication::find($id);
        $reportPublication->status = $request->status;
        $reportPublication->save();
        return $reportPublication;
    }

    public function bloquearPublication(Request $request, string $id)
    {
        $reportPublication = ReportPublication::find($id);
        $reportPublication->status = 'disable';
        $reportPublication->save();
    
        $publication = new PublicationController;
        $publication_find = $publication->blockPublication($reportPublication->publication_id);

        if($publication_find->publication_type_id == 3){
            $bank = new BankController;
            $bank = $bank->show($publication_find->username);
            $bank->aplication_currency = $bank->aplication_currency + 
            ($publication_find->unit_price * $publication_find->quantity_stock);
            $bank->save();
        }
        return $reportPublication;
    }

    public function infoBloqueoPublication(string $id)
    {
        $reportPublication = ReportPublication::query()
        -> where('publication_id', $id)
        -> get();
        return $reportPublication;
    }
}
