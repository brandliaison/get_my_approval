<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class ServiceCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name', 'slug', 'description', 'title',
        'revised_by', 'first_approver', 'first_approved_date',
        'final_approver', 'final_approved_date', 'from_platform',
        'approval_status', 'status',
    ];

    public function revisions()
    {
        return $this->hasMany(ServiceCategoryRevision::class, 'service_category_id', '_id');
    }

    public function reviews()
    {
        return $this->hasMany(ServiceCategoryReview::class);
    }

    public function reviewSingle($id)
    {
        return $this->belongsTo(ServiceCategoryReview::class, $id, '_id');
    }

    public function latestReview()
    {
        return $this->hasOne(ServiceCategoryReview::class)->latestOfMany();
    }

    public function firstAppoveruser()
    {
        return $this->belongsTo(OpStaff::class, 'first_approver', '_id')->select('_id', 'name', 'email');
    }

    public function finalAppoveruser()
    {
        return $this->belongsTo(OpStaff::class, 'final_approver', '_id')->select('_id', 'name', 'email');
    }
}
