<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Messages;

class MessagesController extends Controller
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
            'text' => 'required',
            'username' => 'required',
            'date_time' => 'required',
            'chat_id' => 'required',
        ]);

        $message = new Messages;
        $message->text = $validate['text'];
        $message->username = $validate['username'];
        $message->date_time = $validate['date_time'];
        $message->chat_id = $validate['chat_id'];
        $message->save();
        return $message;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $chat_id)
    {
        //
        $messages = Messages::query()
        ->where('chat_id', $chat_id)
        ->get();
        return $messages;
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
