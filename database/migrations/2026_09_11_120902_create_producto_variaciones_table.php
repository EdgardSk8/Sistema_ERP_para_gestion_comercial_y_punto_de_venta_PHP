<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('producto_variaciones', function (Blueprint $table) {

            $table->increments('id_variacion');

            $table->unsignedInteger('id_producto');

            $table->string('color', 50);

            $table->boolean('estado_variacion')->default(true);

            $table->foreign('id_producto')
                ->references('id_producto')
                ->on('productos')
                ->onDelete('cascade');

            $table->unique(['id_producto', 'color']);

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('producto_variaciones');
    }
};
