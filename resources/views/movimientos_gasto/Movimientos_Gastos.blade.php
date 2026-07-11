<turbo-frame id="contenido-dinamico">

    @include('movimientos_gasto.CheckColumnasMovimientosGastos')

    <div class="card">

        <table id="tablaMovimientosGastos" class="table  table-bordered">

            <thead>
                <tr>
                    <th>ID</th>
                    <th>Usuario</th>
                    <th>Fecha</th>
                    <th>Gasto</th>
                    <th>Origen</th>
                    <th>Caja</th>
                    <th>Cuenta</th>
                    <th>Monto</th>
                    <th>Observación</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>

</turbo-frame>