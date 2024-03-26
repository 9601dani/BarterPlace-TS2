<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RequestSeller extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_request_seller';
    protected $fillable = [
        'id_request_seller',
        'username',
        'status'
    ];
    public $timestamps = false;
    

}
