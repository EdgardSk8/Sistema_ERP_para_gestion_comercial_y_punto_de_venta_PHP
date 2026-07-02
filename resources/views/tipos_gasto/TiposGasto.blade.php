<turbo-frame id="contenido-dinamico">

    @include('tipos_gasto.CheckColumnasTipoGasto')
    @include('tipos_gasto.CrearTipoGasto') {{-- MODAL CREAR --}}
    @include('tipos_gasto.EditarTipoGasto') {{-- MODAL EDITAR --}}

    <div class="card">

        <table id="tablaTipoGasto" class="table  table-bordered">

            <thead>
                <tr>
                    <th>Nombre del Tipo de Gasto</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>
    
</turbo-frame>