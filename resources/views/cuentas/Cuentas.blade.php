<turbo-frame id="contenido-dinamico">
     
    @include('cuentas.CheckColumnasCuentas')
    @include('cuentas.CrearCuenta')
    @include('cuentas.EditarCuenta')
    @include('cuentas.TransferirCuenta')

    <!-- ════════════ TABLA DE CUENTAS ════════════ -->

    <table id="tablaCuentas" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>Nombre Cuenta</th>
                <th>Tipo</th>
                <th>Descripción</th>
                <th>Saldo</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody></tbody>

    </table>

</turbo-frame>