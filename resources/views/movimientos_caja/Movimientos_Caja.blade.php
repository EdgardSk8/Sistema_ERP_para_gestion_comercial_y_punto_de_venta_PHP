<turbo-frame id="contenido-dinamico">

    @include("movimientos_caja.CheckColumnasMovimiento_Caja")

    <table id="tablaMovimientosCaja" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Caja</th>
                <th>Tipo</th>
                <th>Monto</th>
                <th>Concepto</th>
                <th>Cuenta Destino</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>

</turbo-frame>
