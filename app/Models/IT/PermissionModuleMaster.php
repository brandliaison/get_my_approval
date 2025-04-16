<?php

namespace App\Models\IT;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class PermissionModuleMaster extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = ['module_name',  'status'];
}
