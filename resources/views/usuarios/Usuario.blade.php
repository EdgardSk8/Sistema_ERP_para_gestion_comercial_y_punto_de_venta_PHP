<turbo-frame id="contenido-dinamico">
        
    @include('usuarios.CheckColumnasUsuarios')
    @include('usuarios.CrearUsuario') {{-- MODAL CREAR USUARIO --}}
    @include('usuarios.EditarUsuario') {{-- MODAL EDITAR USUARIO --}}

    <div class="card">

        <table id="tablaUsuarios" class="table table-bordered">

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

    </div>
    
</turbo-frame>