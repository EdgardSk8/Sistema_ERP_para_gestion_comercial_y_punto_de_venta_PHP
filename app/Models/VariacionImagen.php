<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VariacionImagen extends Model
{
    protected $table = 'variacion_imagenes';

    protected $primaryKey = 'id_imagen';

    public $timestamps = false;

    protected $fillable = [
        'id_variacion',
        'imagen',
        'orden',
    ];

    public function variacion(): BelongsTo
    {
        return $this->belongsTo(
            ProductoVariacion::class,
            'id_variacion',
            'id_variacion'
        );
    }
}
