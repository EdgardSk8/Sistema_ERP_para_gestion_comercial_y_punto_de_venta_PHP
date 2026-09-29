<turbo-frame id="contenido-dinamico">

    @include('productosvariacion.CheckColumnasProductoVariacion')
    @include('productosvariacion.CrearProductoVariacion')
    @include('productosvariacion.EditarProductoVariacion')

    <div class="card">

        <table id="tablaProductoVariaciones" class="table table-bordered">

            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Color</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody></tbody>

            <tfoot>
                <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                    <th></th>
                </tr>
            </tfoot>

        </table>

    </div>

</turbo-frame>