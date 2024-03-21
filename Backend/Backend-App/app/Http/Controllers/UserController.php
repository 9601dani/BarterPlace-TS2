<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\client;

class UserController extends Controller
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
    public function store(Request $request)
    {
        //


        $validate = $request->validate([
            'username' => 'required',
            'email' => 'required',
            'password' => 'required',
            'name' => 'nullable',
            'date_of_birth' => 'nullable',
            'description' => 'nullable',
            'profile_picture' => 'nullable',
            'role' => 'nullable',
            'gender'=> 'nullable',
            'is_seller' => 'required'
        ]);
        $user = new Client;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->name = $request->name;
        $user->date_of_birth = $request->date_of_birth;
        $user->description = $request->description;
        $user->profile_picture = $request->profile_picture;
        $user->role = $request->role;
        $user->gender = $request->gender;
        $user->is_seller = $request->is_seller; 

        $user->save();

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //aqui pondre el id a buscar
        return Client::find($id);
            
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        //
        $user = new Client;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->password = $request->password;
        $user->name = $request->name;
        $user->date_of_birth = $request->date_of_birth;
        $user->description = $request->description;
        $user->profile_picture = $request->profile_picture;
        $user->role = $request->role;
        $user->gender = $request->gender;
        $user->is_seller = $request->is_seller;

        return Client::query()
        ->where('username', $request->username)
        ->update($user->toArray());

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function auth(Request $request)
    {
        $user = Client::where('username', $request->username)->where('password', $request->password)->first();
        if($user){
            return $user;
        }else{
            return null;
        }
    }

    public function getAllAdmins()
    {
        return Client::all()->where ('role', 'admin');
    
    }

    public function deleteAdmin(string $id)
    {
        $user = Client::find($id);
        $user->delete();
    }

    public function updateImg(Request $request)
    {
        $validate = $request->validate([
            'username' => 'required',
            'profile_picture' => 'required'
        ]);
        $user = new Client;
        $user->profile_picture = $request->profile_picture;

        return Client::query()
        ->where('username', $request->username)
        ->update($user->toArray());
    }

}
