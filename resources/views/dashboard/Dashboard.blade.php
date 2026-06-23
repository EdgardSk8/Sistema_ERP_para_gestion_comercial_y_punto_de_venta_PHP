<turbo-frame id="contenido-dinamico">

    <link rel="stylesheet" href="{{ Vite::asset('resources/css/dashboard/Dashboard.css') }}">
    

    <div class="contenido">
        <div class="scrolling">

            @include('dashboard.VentasGrafica')
            @include('dashboard.GananciasGrafica')
            @include('dashboard.Movimiento_InventarioGrafica')

        </div>
    </div>

</turbo-frame>