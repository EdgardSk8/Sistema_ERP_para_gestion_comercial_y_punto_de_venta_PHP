<turbo-frame id="contenido-dinamico">

    @include('cajas.CheckColumnasCajas')

    <div class="card">

        <table id="tablaCajas" class="table  table-bordered">

            <thead>
                <tr>
                    <th>Nº Caja</th>
                    <th>Usuario</th>
                    <th>Fecha Apertura</th>
                    <th>Fecha Cierre</th>
                    <th>Monto Inicial</th>
                    <th>Monto Final</th>
                    <th>Estado</th>
                </tr>
            </thead>

            <tbody></tbody>

        </table>

    </div>
        
</turbo-frame>