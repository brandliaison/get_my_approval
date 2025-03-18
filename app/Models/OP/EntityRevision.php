<?php

namespace App\Models\OP;

use App\Models\IT\ItStaff;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class EntityRevision extends Model
{
    use HasFactory;

    protected $fillable = [
        'entity_type',
        'entity_id',
        'old_data',
        'new_data',
        'revised_by',
        'from_platform',
        'status',
    ];

    protected $casts = [
        'old_data' => 'array',
        'new_data' => 'array',
    ];

    public function getRevisedUserAttribute()
    {
        if ($this->from_platform === "operations") {
            return OpStaff::select('_id', 'name', 'email')->find($this->revised_by);
        }

        if ($this->from_platform === "partner") {
            return ItStaff::select('_id', 'name', 'email')->find($this->revised_by);
        }

        return null; // Return null if no matching condition
    }

    public function getEntityDataAttribute()
    {
        $models = [
            "Service" => Service::class,
            "ServiceCategory" => ServiceCategory::class,
            "ServiceSection" => ServiceSection::class,
            "Blog" => Blog::class,
            "BlogCategory" => BlogCategory::class,
            "Notification" => Notification::class,
            "NotificationCategory" => NotificationCategory::class,
            "Product" => Product::class,
            "ProductCategory" => ProductCategory::class,
            "Faq" => Faq::class,
            "FaqCategory" => FaqCategory::class,
        ];

        return isset($models[$this->entity_type]) ? $models[$this->entity_type]::find($this->entity_id) : null;
    }

    protected $appends = ['revised_user', 'entity_data'];
}
