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
        Schema::create('user', function (Blueprint $table) {
            $table->string('username') -> unique();
            $table->string('email') -> unique();
            $table->string('password');
            $table->string('role')-> default('client');
            $table->string('description') -> nullable();
            $table->string('profile_picture') -> nullable();
            $table->date('date_of_birth') -> nullable();
            $table->string('gender') -> nullable();
            $table->string('phone_number') -> nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
