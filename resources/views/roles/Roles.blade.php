<turbo-frame id="contenido-dinamico">

    @include('roles.CheckColumnasRoles')
    @include('roles.CrearRol') {{-- MODAL CREAR ROL --}}
    @include('roles.EditarRol') {{-- MODAL EDITAR ROL --}}

    <table id="tablaRoles" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>Nombre del Rol</th>
                <th>Descripción</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody></tbody>

    </table>

</turbo-frame>