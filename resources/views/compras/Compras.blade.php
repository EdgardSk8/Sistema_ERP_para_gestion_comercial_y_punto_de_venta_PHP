<turbo-frame id="contenido-dinamico">

    @include('compras.CheckColumnasCompras')

    <table id="tablaCompras" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>ID</th>
                <th>Factura</th>
                <th>Proveedor</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Subtotal</th>
                <th>Desc</th>
                <th>Impuesto</th>
                <th>Total</th>
                <th>Método Pago</th>
                <th>Estado</th>
                <th>Detalles</th>
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
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>

    </table>

    @include('compras.DetalleCompra')

    <!-- ╔════════ Mensaje Toast ══════════╗ -->
    <!-- ╚═════════════════════════════════╝ -->

    <div class="toast-container position-fixed top-0 end-0 p-3">

        <div id="toastMensaje" class="toast text-bg-success border-0">

            <div class="d-flex">

                <div class="toast-body" id="toastTexto"></div>

                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>

            </div>

        </div>

    </div>

</turbo-frame>