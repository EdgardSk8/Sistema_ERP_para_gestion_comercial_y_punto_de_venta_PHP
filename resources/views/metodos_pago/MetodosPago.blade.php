<turbo-frame id="contenido-dinamico">

    @include('metodos_pago.CheckColumnasMetodosPago')
    @include('metodos_pago.CrearMetodoPago') {{-- MODAL CREAR --}}
    @include('metodos_pago.EditarMetodoPago') {{-- MODAL EDITAR --}}

    <div class="card">

        <table id="tablaMetodosPago" class="table  table-bordered">

            <thead>

                <tr>
                    <th>Nombre del Método</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>

            </thead>

            <tbody></tbody>

        </table>

    </div>

</turbo-frame>