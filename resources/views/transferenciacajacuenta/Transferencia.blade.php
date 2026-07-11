<turbo-frame id="contenido-dinamico">

    @include("transferenciacajacuenta.CheckColumnasTransferirCuentas")
    @include('transferenciacajacuenta.TransferirCuenta')

    <div class="card">

        <table id="tablaCajaCuenta" class="table table-bordered">

            <thead>
                <tr>
                    <th>Caja</th>
                    <th>Fecha</th>
                    <th>Abre Caja</th>
                    <th>Cierra Caja</th>
                    <th>Saldo</th>
                    <th>Transferido</th>
                    <th>Cuenta Transferida</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>

    @include('transferenciacajacuenta.DetalleCuenta')

</turbo-frame>