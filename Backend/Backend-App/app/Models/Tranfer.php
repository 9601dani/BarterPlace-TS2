<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tranfer extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'username_sender',
        'username_receiver',
        'amount',
        'date'
    ];
    public $timestamps = false;
}
