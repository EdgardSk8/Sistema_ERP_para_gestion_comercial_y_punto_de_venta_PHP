<turbo-frame id="contenido-dinamico">

    @include("transferenciacajacuenta.CheckColumnasTransferirCuentas")
    @include('transferenciacajacuenta.TransferirCuenta')

    <table id="tablaCajaCuenta" class="table table-striped table-bordered">

        <thead class="table-dark">
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


    @include('transferenciacajacuenta.DetalleCuenta')

    <div class="toast-container position-fixed top-0 end-0 p-3">

        <div id="toastMensaje" class="toast text-bg-success border-0">

            <div class="d-flex">

                <div class="toast-body" id="toastTexto"></div>

                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>

            </div>

        </div>

    </div>

</turbo-frame>