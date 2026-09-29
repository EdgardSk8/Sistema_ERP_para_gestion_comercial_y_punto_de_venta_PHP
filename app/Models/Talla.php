<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Talla extends Model
{
    protected $table = 'tallas';

    protected $primaryKey = 'id_talla';

    public $timestamps = false;

    protected $fillable = [
        'talla',
        'estado_talla',
    ];

    public function variaciones(): HasMany
    {
        return $this->hasMany(
            VariacionTalla::class,
            'id_talla',
            'id_talla'
        );
    }
}
