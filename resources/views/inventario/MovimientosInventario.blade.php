<turbo-frame id="contenido-dinamico">

    @include('inventario.CheckColumnas')
    
    <table id="tablaKardex" class="table table-striped table-bordered">
        <thead>
            <tr>
                <th>ID</th>
                <th>Usuario</th>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Movimiento</th>
                <th>Tipo</th>
                <th>Motivo Movimiento</th>
                <th>Cant</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>T. Vendido C$</th>
            </tr>
        </thead>
        <tbody></tbody>
        <tfoot>
            <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
        </tfoot>
    </table>

</turbo-frame>

