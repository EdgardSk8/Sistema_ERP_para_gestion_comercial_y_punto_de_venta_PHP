<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('variacion_imagenes', function (Blueprint $table) {

            $table->increments('id_imagen');

            $table->unsignedInteger('id_variacion');

            $table->string('imagen', 255);

            $table->unsignedInteger('orden')->default(0);

            $table->foreign('id_variacion')
                ->references('id_variacion')
                ->on('producto_variaciones')
                ->onDelete('cascade');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('variacion_imagenes');
    }
};
