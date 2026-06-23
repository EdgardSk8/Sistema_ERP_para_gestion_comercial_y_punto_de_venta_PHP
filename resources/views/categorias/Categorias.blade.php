<turbo-frame id="contenido-dinamico">

    @include('categorias.CheckColumnasCategorias')
    @include('categorias.CrearCategoria') {{-- MODAL CREAR CATEGORIA --}}
    @include('categorias.EditarCategoria') {{-- MODAL EDITAR CATEGORIA --}}

    <table id="tablaCategorias" class="table table-striped table-bordered">

        <thead>
            <tr>
                <th>Nombre de la Categoría</th>
                <th>Descripción</th>
                <th>Fecha de Creación</th>
                <th>Estado</th>
                <th>Acciones</th>
            </tr>
        </thead>

        <tbody></tbody>

    </table>

</turbo-frame>