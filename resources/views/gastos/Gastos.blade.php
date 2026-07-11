<turbo-frame id="contenido-dinamico">

{{-- ══════════════════════════════════ MODALES ══════════════════════════════════ --}}

    @include('gastos.CrearGasto')
    @include('gastos.EditarGasto')
    @include('gastos.PagarGasto')
    @include('gastos.DetalleGasto')
    @include('gastos.CheckColumnasGastos')

<!-- ═════════════════════════════ Tabla (Datatables) ════════════════════════════ -->

    <div class="card">

        <table id="tablaGastos" class="table  table-bordered">

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

    </div>

</turbo-frame>