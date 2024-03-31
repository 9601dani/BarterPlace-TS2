<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecordRecharge extends Model
{
    use HasFactory;
    protected $primaryKey = 'id';
    protected $fillable = [
        'date',
        'amount',
        'type',
        'number',
        'username'
    ];
    public $timestamps = false;
}
