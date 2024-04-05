<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationCopy extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'date_sell',
        'username_seller',
        'username_buyer',
        'foto',
        'total_cost',
        'publication_type_id',
        'category',
        'unit_price',
        'quantity'
    ];
    public $timestamps = false;
}
