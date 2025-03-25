<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class ServicePartner extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'country',
        'name',
        'email',
        'email_otp',
        'email_verified_at',
        'mobile',
        'mobile_otp',
        'mobile_verified_at',
        'alt_mobile',
        'password',
        'country',
        'state',
        'district',
        'pincode',
        'aadhar_number',
        'aadhar_verified',
        'aadhar_details',
        'office_address',
        'office_district',
        'office_state',
        'office_pincode',
        'dob',
        'id_card',
        'academic_details',
        'experience_years',
        'experience_months',
        'skills',
        'profile_photo',
        'photo',
        'agreed_terms',
        'status',
    ];
}
