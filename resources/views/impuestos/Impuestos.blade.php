<turbo-frame id="contenido-dinamico">

    @include('impuestos.CheckColumnasImpuestos')
    @include('impuestos.CrearImpuesto')
    @include('impuestos.EditarImpuesto')

    <div class="card">

        <table id="tablaImpuestos" class="table  table-bordered">

            <thead>
                <tr>
                    <th>Nombre del Impuesto</th>
                    <th>Porcentaje (%)</th>
                    <th>Fecha de Creación</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>

</turbo-frame>