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
        Schema::create('record_buy_packs', function (Blueprint $table) {
            $table->id();
            $table->string('date');
            $table->string('combo_name');
            $table->integer('price');
            $table->integer('coins');
            $table->string('username');
            $table->foreign('username')->references('username')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('record_buy_packs');
    }
};
