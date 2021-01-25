<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $table = 'comments';
    use HasFactory;

    protected $fillable = [
        'content',
        'user_id',
        'task_id',
    ];
}
