<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model as EloquentModel;

class ServiceSection extends EloquentModel
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'name',
        'slug',
        'content',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'approval_status',
        'status',
    ];
}
