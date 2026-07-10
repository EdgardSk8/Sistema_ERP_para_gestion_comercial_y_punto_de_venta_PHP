
<turbo-frame id="contenido-dinamico">

    @include('ventas.CheckColumnasVentas')

    <div class="card">

        <table id="tablaVentas" class="table table-bordered">

            <thead>
                <tr>
                    <th>ID</th>                    
                    <th>Factura</th>
                    <th>Cliente</th>
                    <th>Usuario</th>
                    <th>Nº Caja</th>
                    <th>Fecha</th>
                    <th>Subtotal</th>
                    <th>Impuesto</th>
                    <th>Total</th>
                    <th>Método Pago</th>
                    <th>Estado</th>
                    <th>Detalles</th>
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
                    <th></th>
                </tr>
            </tfoot>

        </table>

    </div>
        

    @include('ventas.DetalleVenta')


</turbo-frame>