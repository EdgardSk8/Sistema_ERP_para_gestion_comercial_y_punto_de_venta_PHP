<turbo-frame id="contenido-dinamico">

    @include('impuestos.CheckColumnasImpuestos')
    @include('impuestos.CrearImpuesto')
    @include('impuestos.EditarImpuesto')

    <table id="tablaImpuestos" class="table table-striped table-bordered">

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

</turbo-frame>