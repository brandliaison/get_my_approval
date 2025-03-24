<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('faq_categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug');
            $table->longText('description')->nullable();
            $table->string('posted_by');
            $table->string('revised_by')->nullable();
            $table->string('first_approver')->nullable();
            $table->date('first_approved_date')->nullable();
            $table->string('final_approver')->nullable();
            $table->date('final_approved_date')->nullable();
            $table->string('from_platform')->nullable();
            $table->string('created_by')->nullable();
            $table->string('parent_category')->nullable();
            $table->string('approval_status')->default('submitted');
            $table->string('status')->default('active');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('faq_categories');
    }
};
