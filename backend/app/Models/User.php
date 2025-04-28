<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_user'; // กำหนด Primary Key ใหม่
    protected $table = 'user';
    public $timestamps = false;
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

}
