<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Medida extends Model
{
    protected $table = 'medidas';
    protected $primaryKey = 'id_medida';
    public $timestamps = false;

    protected $fillable = [
        'id_tipo_medida',
        'nombre_medida',
        'abreviatura_medida',
        'orden_medida',
        'estado_medida',
        'fecha_creacion_medida'
    ];

    // 🔗 Cada medida pertenece a un tipo de medida
    public function tipomedida()
    {
        return $this->belongsTo(TipoMedida::class, 'id_tipo_medida', 'id_tipo_medida');
    }
}