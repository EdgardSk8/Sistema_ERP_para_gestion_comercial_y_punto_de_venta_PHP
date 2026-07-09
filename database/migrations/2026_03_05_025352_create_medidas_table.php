<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{               

    public function up(): void
    {
        Schema::create('medidas', function (Blueprint $table) {
            $table->id('id_medida');

            $table->unsignedBigInteger('id_tipo_medida');

            $table->string('nombre_medida', 100);
            $table->string('abreviatura_medida', 20);
            $table->integer('orden_medida')->default(0);

            $table->boolean('estado_medida')->default(true);
            $table->timestamp('fecha_creacion_medida')->useCurrent();

            $table->foreign('id_tipo_medida')
                ->references('id_tipo_medida')
                ->on('tipos_medidas')
                ->onUpdate('cascade')
                ->onDelete('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('medidas');
    }
};
