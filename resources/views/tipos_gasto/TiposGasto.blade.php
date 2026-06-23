<turbo-frame id="contenido-dinamico">

    @include('tipos_gasto.CheckColumnasTipoGasto')
    @include('tipos_gasto.CrearTipoGasto') {{-- MODAL CREAR --}}
    @include('tipos_gasto.EditarTipoGasto') {{-- MODAL EDITAR --}}

    <table id="tablaTipoGasto" class="table table-striped table-bordered">

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
    
</turbo-frame>