<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $categories = Category::query()
        ->orderBy('id', 'asc')->get();
        return $categories;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'category_name' => 'required'
        ]);
        $category = new Category;
        $category->category_name = $request->category_name;
        $category->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $name)
    {
        //
        return Category::query()->where('category_name', $name)->first();
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
