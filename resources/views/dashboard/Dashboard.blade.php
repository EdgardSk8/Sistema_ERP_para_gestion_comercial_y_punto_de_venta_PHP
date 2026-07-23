<turbo-frame id="contenido-dinamico">

    <link rel="stylesheet" href="{{ Vite::asset('resources/css/dashboard/Dashboard.css') }}">
    
    <div class="Contenedor_graficas">

        <div class="Encabezado">

            <div class="Graficas_elementos_scroll">
                
                <div class="GrupoBotones">

                    <input type="radio" id="ventas" name="dashboard" value="ventas" checked>
                    <label for="ventas" class="BotonGrupo">
                        Ventas
                    </label>

                    <input type="radio" id="compras" name="dashboard" value="compras">
                    <label for="compras" class="BotonGrupo">
                        Compras
                    </label>

                    <input type="radio" id="ganancias" name="dashboard" value="ganancias">
                    <label for="ganancias" class="BotonGrupo">
                        Ganancias
                    </label>

                    <input type="radio" id="rendimiento" name="dashboard" value="rendimiento">
                    <label for="rendimiento" class="BotonGrupo">
                        Rendimiento de Usuarios
                    </label>

                </div>
                
            </div>

        </div>

        <div class="CG">

            <div class="Contenedor_graficas_1">

                <div class="Contenedor_kpis">

                    <div class="kpis">
                        <i class="fas fa-cash-register"></i>
                        <div id="kpi-total-ventas" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                    <div class="kpis">
                        <i class="fas fa-dollar-sign"></i>
                        <div id="kpi-ingresos" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                    <div class="kpis">
                        <i class="fas fa-boxes"></i>
                        <div id="kpi-unidades-vendidas" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                    <div class="kpis">
                        <i class="fas fa-shopping-cart"></i>
                        <div id="kpi-promedio-venta" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                    <div class="kpis">
                        <i class="fas fa-chart-line"></i>
                        <div id="kpi-venta-maxima" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                    <div class="kpis">
                        <i class="fas fa-percent"></i>
                        <div id="kpi-impuestos" class="kpis-info">
                            <label></label>
                            <strong></strong>
                        </div>
                    </div>

                </div>

                <div class="Contenedor_Grafica">

                    <!-- FILTRO DE GRAFICAS -->
                    <div class="Filtros_Graficas">

                        <div class="btn-group btn-group-sm" role="group" aria-label="Filtro de ventas">

                            <input type="radio" class="btn-check" name="Filtro-Ventas" id="ventas-dia" value="dia">
                            <label class="btn btn-outline-primary" for="ventas-dia">
                                Día
                            </label>

                            <input type="radio" class="btn-check" name="Filtro-Ventas" id="ventas-mes" value="mes" checked>
                            <label class="btn btn-outline-primary" for="ventas-mes">
                                Mes
                            </label>

                            <input type="radio" class="btn-check" name="Filtro-Ventas" id="ventas-anio" value="anio">
                            <label class="btn btn-outline-primary" for="ventas-anio">
                                Año
                            </label>

                        </div>

                        <input type="date" class="form-control form-control-sm" id="Fecha-Inicio-Ventas" placeholder="Fecha inicio" autocomplete="off" >
                        <input  type="date" class="form-control form-control-sm" id="Fecha-Fin-Ventas" placeholder="Fecha fin" autocomplete="off" >
                        <button type="button" class="btn btn-sm-modal btn-limpiar-filtro" id="BTN-Limpiar-Ventas"> Limpiar filtros </button>

                    </div>

                    <div class="dashboard-chart card-responsive"> <canvas id="chartVentas"></canvas> </div>

                </div>

            </div>

            <div class="Contenedor_graficas_2">
                
                <div class="card-responsive cantidad">
                    <canvas id="chartCantidadVentas"></canvas>
                </div>

                <div class="card-responsive">

                    hola

                </div>

            </div>



        </div>


        

    </div>










</turbo-frame>