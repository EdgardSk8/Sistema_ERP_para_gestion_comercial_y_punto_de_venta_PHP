<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductoVariacion extends Model
{
    protected $table = 'producto_variaciones';

    protected $primaryKey = 'id_variacion';

    public $timestamps = false;

    protected $fillable = [
        'id_producto',
        'color',
        'estado_variacion',
    ];

    public function producto(): BelongsTo
    {
        return $this->belongsTo(
            Producto::class,
            'id_producto',
            'id_producto'
        );
    }

    public function imagenes(): HasMany
    {
        return $this->hasMany(
            VariacionImagen::class,
            'id_variacion',
            'id_variacion'
        )->orderBy('orden');
    }

    public function tallas(): HasMany
    {
        return $this->hasMany(
            VariacionTalla::class,
            'id_variacion',
            'id_variacion'
        );
    }
}
