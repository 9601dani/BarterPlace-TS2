<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarjet extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'number',
        'name',
        'expiration',
        'cvv',
        'username'
    ];
    public $timestamps = false;
}
