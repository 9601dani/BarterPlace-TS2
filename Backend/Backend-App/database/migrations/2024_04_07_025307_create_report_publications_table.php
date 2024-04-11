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
        Schema::create('report_publications', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('publication_id');
            $table->string('title');
            $table->longtext('description');
            $table->longtext('foto');
            $table->string('category');
            $table->integer('unit_price');
            $table->string('username_publication');
            $table->longtext('comment');
            $table->date('date');
            $table->enum('status', ['active', 'disable']);
            $table->string('username_report');
            $table->foreign('publication_id')->references('id')->on('publications');
            $table->foreign('username_publication')->references('username')->on('clients');
            $table->foreign('username_report')->references('username')->on('clients');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('report_publications');
    }
};
