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
        Schema::create('publication_copies', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longtext('description');
            $table->date('date_sell');
            $table->string('username_seller');
            $table->string('username_buyer');
            $table->longtext('foto');
            $table->integer('total_cost');
            $table->unsignedBigInteger('publication_type_id');
            $table->string('category');
            $table->integer('unit_price');
            $table->integer('quantity');
            $table->foreign('category')->references('category_name')->on('categories');
            $table->foreign('publication_type_id')->references('id')->on('publication_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publication_copies');
    }
};
