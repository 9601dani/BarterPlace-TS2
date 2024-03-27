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
        'cost',
        'publication_type_id',
        'category'
    ];
    public $timestamps = false;
}
