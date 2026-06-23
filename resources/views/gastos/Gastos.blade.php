<turbo-frame id="contenido-dinamico">

{{-- ══════════════════════════════════ MODALES ══════════════════════════════════ --}}

@include('gastos.CrearGasto')
@include('gastos.EditarGasto')
@include('gastos.PagarGasto')
@include('gastos.DetalleGasto')
@include('gastos.CheckColumnasGastos')

<!-- ═════════════════════════════ Tabla (Datatables) ════════════════════════════ -->

<table id="tablaGastos" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Detalle</th>
                <th>Vencimiento</th>
                <th>Estado pago</th>
                <th>Último Pago</th>
                <th>Monto</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>

    <tbody></tbody>

</table>

<!-- ═════════════════════════════════════════════════════════════════════════════ -->

<!--    ╔════════ Mensaje Toast ══════════╗ 
        ╚═════════════════════════════════╝     -->

    <div class="toast-container position-fixed top-0 end-0 p-3">

        <div id="toastMensaje" class="toast text-bg-success border-0">

            <div class="d-flex">

            <div class="toast-body" id="toastTexto"></div>

                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>

            </div>

        </div>

    </div>

</turbo-frame>