<turbo-frame id="contenido-dinamico">

@include('movimientos_cuenta.CheckColumnasMovimientoCuentas')

    <div class="card">

        <table id="tablaMovimientosCuenta" class="table  table-bordered">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Cuenta</th>
                    <th>Tipo</th>
                    <th>Descripción</th>
                    <th>Monto</th>
                </tr>
            </thead>

            <tbody></tbody>

            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>

        </table>

    </div>

</turbo-frame>