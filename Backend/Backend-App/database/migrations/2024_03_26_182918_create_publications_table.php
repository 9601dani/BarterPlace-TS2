<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\PublicationType;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->longtext('description');
            $table->date('date');
            $table->enum('status', ['pending', 'active','inactive', 'completed','rejected']);
            $table->string('username');
            $table->longtext('foto');
            $table->integer('total_cost');
            $table->unsignedBigInteger('publication_type_id');
            $table->string('category');
            $table->integer('unit_price');
            $table->integer('quantity');
            $table->foreign('category')->references('category_name')->on('categories');
            $table->foreign('username')->references('username')->on('clients');
            $table->foreign('publication_type_id')->references('id')->on('publication_types');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publications');
    }
};
