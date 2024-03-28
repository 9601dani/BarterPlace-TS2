<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'date',
        'status',
        'username',
        'foto',
        'total_cost',
        'publication_type_id',
        'category',
        'unit_price',
        'quantity'
    ];
    public $timestamps = false;
}
