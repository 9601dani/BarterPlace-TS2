<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReportPublication extends Model
{
    protected $primaryKey = 'id';
    use HasFactory;
    protected $fillable = [
        'publication_id',
        'title',
        'description',
        'foto',
        'category',
        'unit_price',
        'username_publication',
        'comment',
        'date',
        'status',
        'username_report'
    ];
    public $timestamps = false;
}
