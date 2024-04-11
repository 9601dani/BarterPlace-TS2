<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Messages;
use App\Models\Chats;

class ChatsController extends Controller
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
            'name' => 'required',
            'username_receiver' => 'required',
            'username_sender' => 'required',
        ]);

        $chat = new Chats;
        $chat->name = $validate['name'];
        $chat->username_receiver = $validate['username_receiver'];
        $chat->username_sender = $validate['username_sender'];
        $chat->save();
        return $chat;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $username)
    {
        //
        $chats = Chats::query()
        ->where('username_receiver', $username)
        ->orWhere('username_sender', $username)
        ->get();
        return $chats;
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

    public function verExistenciaChat(Request $request)
    {
        $validate = $request->validate([
            'username_receiver' => 'required',
            'username_sender' => 'required',
        ]);
        $chat = Chats::query()
        ->where(function ($query) use ($validate) {
            $query->where('username_receiver', $validate['username_receiver'])
                  ->where('username_sender', $validate['username_sender']);
        })
        ->orWhere(function ($query) use ($validate) {
            $query->where('username_receiver', $validate['username_sender'])
                  ->where('username_sender', $validate['username_receiver']);
        })
        ->first();

    return $chat;
    }
}
