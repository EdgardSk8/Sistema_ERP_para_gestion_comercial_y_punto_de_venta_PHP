<turbo-frame id="contenido-dinamico">

    @include('metodos_pago_cuenta.CheckColumnasMetodosPagoCuenta')
    @include('metodos_pago_cuenta.CrearMetodoPagoCuenta')
    @include('metodos_pago_cuenta.EditarMetodoPagoCuenta')

    <div class="card">

        <table id="tablaMetodoPagoCuenta" class="table  table-bordered">

            <thead>
                <tr>
                    <th>Método de Pago</th>
                    <th>Cuentas Asociadas</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>

</turbo-frame>