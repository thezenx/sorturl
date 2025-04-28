<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Table_url extends Model
{
    use HasFactory;
    protected $primaryKey = 'id_url'; // กำหนด Primary Key ใหม่
    protected $table = 'table_url';
    public $timestamps = false;
    protected $fillable = ['original_url', 'short_code'];
}
