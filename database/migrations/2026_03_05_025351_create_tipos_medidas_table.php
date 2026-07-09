<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    
    public function up(): void
    {
        Schema::create('tipos_medidas', function (Blueprint $table) {
            $table->id('id_tipo_medida');

            $table->string('nombre_tipo_medida', 100);
            $table->string('descripcion_tipo_medida', 255)->nullable();

            $table->boolean('estado_tipo_medida')->default(true);
            $table->timestamp('fecha_creacion_tipo_medida')->useCurrent();
        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('tipos_medidas');
    }
};
