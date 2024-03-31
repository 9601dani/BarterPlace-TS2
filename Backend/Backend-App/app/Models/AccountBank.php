<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AccountBank extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'number',
        'name',
        'bank',
        'type',
        'username'
    ];
    public $timestamps = false;

}
