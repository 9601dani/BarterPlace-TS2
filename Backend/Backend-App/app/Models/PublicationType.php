<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PublicationType extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_publication_type';
    protected $fillable = [
        'id_publication_type',
        'type_name'
    ];
    public $timestamps = false;
}
