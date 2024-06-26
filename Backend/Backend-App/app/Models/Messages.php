<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Messages extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'text',
        'username',
        'date_time',
        'chat_id',
    ];
    public $timestamps = false;
}
