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
        Schema::create('clients', function (Blueprint $table) {
            $table->string('username')->unique()->comment = ('The username of the user');
            $table->string('email')->unique()->comment = 'The email of the user';
            $table->string('password')->comment = 'The password of the user';
            $table->string('name')-> nullable()->comment = 'The name of the user';
            $table->date('date_of_birth')->nullable()->comment = 'The date of birth of the user';
            $table->string('description')->nullable()->comment = 'The description of the user';
            $table->binary('profile_picture')->nullable()->comment = 'The profile picture of the user';
            $table->string('role')->default('user')->comment = 'The role of the user';
            $table->string('gender')->nullable()->comment ='The gender of the user';
            $table->boolean('is_seller')->default(false)->comment = 'The status of the user';
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
