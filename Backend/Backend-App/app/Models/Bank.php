<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bank extends Model
{

    use HasFactory;
    protected $primaryKey = 'id_bank';
    protected $fillable =[
        'id_bank',
        'volunteer_currency',
        'aplication_currency',
        'money',
        'username'
    ];
    public $timestamps = false;
    
}
