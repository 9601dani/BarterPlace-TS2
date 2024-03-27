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
            $table->enum('status', ['pending', 'active','inactive']);
            $table->string('username');
            $table->longtext('foto');
            $table->integer('cost');
            $table->foreignId(PublicationType::class)->constrained();
            $table->string('category');

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
