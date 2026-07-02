<turbo-frame id="contenido-dinamico">

    @include("movimientos_caja.CheckColumnasMovimiento_Caja")

    <div class="card">

        <table id="tablaMovimientosCaja" class="table  table-bordered">
            
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

    </div>

</turbo-frame>
