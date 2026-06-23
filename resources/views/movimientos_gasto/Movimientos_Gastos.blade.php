<turbo-frame id="contenido-dinamico">

    @include('movimientos_gasto.CheckColumnasMovimientosGastos')

    <table id="tablaMovimientosGastos" class="table table-striped table-bordered">

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

    <!--    ╔════════ Mensaje Toast ══════════╗ 
            ╚═════════════════════════════════╝     -->

    <div class="toast-container position-fixed top-0 end-0 p-3">

        <div id="toastMensaje" class="toast text-bg-success border-0">

            <div class="d-flex">

                <div class="toast-body" id="toastTexto"></div>

                <button type="button" class="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast">
                </button>

            </div>

        </div>

    </div>
</turbo-frame>