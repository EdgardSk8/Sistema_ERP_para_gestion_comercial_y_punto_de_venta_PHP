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
       Schema::create('metodo_pago_cuenta', function (Blueprint $table) {
            $table->id('id_metodo_pago_cuenta');

            $table->unsignedInteger('id_metodo_pago');
            $table->unsignedInteger('id_cuenta');

            $table->boolean('estado')->default(true);

            $table->timestamps();

            $table->foreign('id_metodo_pago')
                ->references('id_metodo_pago')
                ->on('metodos_pago')
                ->cascadeOnDelete();

            $table->foreign('id_cuenta')
                ->references('id_cuenta')
                ->on('cuentas')
                ->cascadeOnDelete();

            $table->unique(['id_metodo_pago', 'id_cuenta']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('metodo_pago_cuenta');
    }
};
