<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chats extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'name',
        'username_receiver',
        'username_sender',
    ];
    public $timestamps = false;
}
