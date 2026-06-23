<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MetodoPagoCuenta extends Model
{
    protected $table = 'metodo_pago_cuenta';

    protected $primaryKey = 'id_metodo_pago_cuenta';

    protected $fillable = [
        'id_metodo_pago',
        'id_cuenta',
        'estado'
    ];

    public function metodoPago()
    {
        return $this->belongsTo(MetodoPago::class, 'id_metodo_pago', 'id_metodo_pago');
    }

    public function cuenta()
    {
        return $this->belongsTo(Cuenta::class, 'id_cuenta', 'id_cuenta');
    }
}