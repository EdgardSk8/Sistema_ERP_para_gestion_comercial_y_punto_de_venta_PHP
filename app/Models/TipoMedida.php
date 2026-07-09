<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoMedida extends Model
{
    protected $table = 'tipos_medidas';
    protected $primaryKey = 'id_tipo_medida';
    public $timestamps = false;

    protected $fillable = [
        'nombre_tipo_medida',
        'descripcion_tipo_medida',
        'estado_tipo_medida',
        'fecha_creacion_tipo_medida'
    ];

    // 🔗 Un tipo de medida tiene muchas medidas
    public function medidas()
    {
        return $this->hasMany(Medida::class, 'id_tipo_medida', 'id_tipo_medida');
    }
}