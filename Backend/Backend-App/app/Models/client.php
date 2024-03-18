<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class client extends Model
{
    protected $primaryKey = 'username';
    public $incrementing = false;
    use HasFactory;
    protected $fillable = [
        'username',
        'email',
        'password',
        'name',
        'date_of_birth',
        'description',
        'profile_picture',
        'role',
        'gender'];
        public $timestamps = false;
}
