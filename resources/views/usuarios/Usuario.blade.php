<turbo-frame id="contenido-dinamico">
        
    @include('usuarios.CheckColumnasUsuarios')
    @include('usuarios.CrearUsuario') {{-- MODAL CREAR USUARIO --}}
    @include('usuarios.EditarUsuario') {{-- MODAL EDITAR USUARIO --}}

    <table id="tablaUsuarios" class="table table-striped table-bordered">

        <thead>

            <tr>
            <th>Nombre</th>
            <th>Cédula</th>
            <th>Usuario</th>
            <th>Rol</th>
            <th>Estado</th>
            <th>Acciones</th>
            </tr>

        </thead>

        <tbody></tbody>

    </table>
    
</turbo-frame>