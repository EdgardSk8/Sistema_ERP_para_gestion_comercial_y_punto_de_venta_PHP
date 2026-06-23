<turbo-frame id="contenido-dinamico">

    @include('clientes.CheckColumnasClientes') 
    @include('clientes.CrearCliente') {{-- MODAL CREAR CLIENTE --}}
    @include('clientes.EditarCliente') {{-- MODAL EDITAR CLIENTE --}}

    <table id="tablaClientes" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Cédula</th>
                <th>RUC</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Estado</th>
                <th>Acciones</th>

            </tr>
        </thead>

    <tbody></tbody>

    </table>

</turbo-frame>
