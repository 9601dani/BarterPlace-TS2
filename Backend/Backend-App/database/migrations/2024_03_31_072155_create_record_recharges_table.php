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
        Schema::create('record_recharges', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->integer('amount');
            $table->enum('type', ['Tarjet', 'Account']);
            $table->string('number');
            $table->string('username');
            $table->foreign('username')->references('username')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_recharges');
    }
};
