<?php

namespace App\Models\OP;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Blog extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'slug',
        'blog_category_id',
        'image_url',
        'image_alt',
        'description',
        'content',
        'technical_name',
        'compliance_header',
        'open_comment',
        'revised_by',
        'first_approver',
        'first_approved_date',
        'final_approver',
        'final_approved_date',
        'from_platform',
        'approval_status',
        'status',
    ];

    // Relationships
    public function category()
    {
        return $this->belongsTo(BlogCategory::class, 'blog_category_id')->select('_id', 'name', 'slug', 'description');
    }

    public function revisedBy()
    {
        // return $this->belongsTo(User::class, 'revised_by');
    }

    public function revisions()
    {
        return $this->hasMany(EntityRevision::class, 'entity_id', '_id')->where('entity_type', 'Blog');
    }
}
