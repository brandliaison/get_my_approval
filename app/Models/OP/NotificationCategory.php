<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class NotificationCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'description',
        'title',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'created_by',
        'approval_status',
        'status',
    ];
}
