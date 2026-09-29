<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('variacion_tallas', function (Blueprint $table) {

            $table->increments('id_variacion_talla');

            $table->unsignedInteger('id_variacion');

            $table->unsignedInteger('id_talla');

            $table->unsignedInteger('stock')->default(0);

            $table->foreign('id_variacion')
                ->references('id_variacion')
                ->on('producto_variaciones')
                ->onDelete('cascade');

            $table->foreign('id_talla')
                ->references('id_talla')
                ->on('tallas')
                ->onDelete('cascade');

            $table->unique(['id_variacion', 'id_talla']);

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('variacion_tallas');
    }
};
