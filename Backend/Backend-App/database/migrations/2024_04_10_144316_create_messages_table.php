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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->longtext('content');
            $table->string('username_sender');
            $table->string('username_receiver');
            $table->dateTime('date_time');
            $table->foreign('username_sender')->references('username')->on('clients');
            $table->foreign('username_receiver')->references('username')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
