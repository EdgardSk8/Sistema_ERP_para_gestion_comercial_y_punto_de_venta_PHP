export default function initDashboard() {

    document.getElementById('titulo').textContent = 'Panel Analitico';

    document.querySelectorAll('input[name="dashboard"]').forEach(radio => {
        radio.addEventListener('change', () => { mostrarToast(radio.value, 'success'); /* Comprobacion */}); 
    });

        let chart = null;
        let chartCantidad = null;

        const $ = id => document.getElementById(id);

        /* ══════════════════ [ELEMENTOS] ═══════════════════ */

        // const Filtro_Ventas         = $('Filtro-Ventas');

        const Fecha_Inicio_Ventas   = $('Fecha-Inicio-Ventas');
        const Fecha_Fin_Ventas      = $('Fecha-Fin-Ventas');

        const BTN_Limpiar_Ventas    = $('BTN-Limpiar-Ventas');

        const ctx_Ventas            = $('chartVentas');
        const ctx_Cantidad = $('chartCantidadVentas');

        /* ══════════════════ [FUNCIONES] ══════════════════ */

        function obtenerFiltroVentas() {
            return document.querySelector('input[name="Filtro-Ventas"]:checked').value;
        }

        async function obtenerVentas() {

            const params = new URLSearchParams({

                tipo: obtenerFiltroVentas(),
                inicio: Fecha_Inicio_Ventas.value,
                fin: Fecha_Fin_Ventas.value

            });

            const response = await fetch(`/dashboard/ventas?${params}`);
            const data = await response.json();

            let datos = [];

            switch (obtenerFiltroVentas()) {

                
                default:
                    datos = data.grafica;
                    break;
            }

            renderGrafica(datos);
            renderGraficaCantidad(datos);
            renderKPIs(data.kpis);

        }

        /* ═════════════════ [KPIs] ═════════════════ */
        function renderKPIs(kpis) {

            if (!kpis) return;

            Object.entries(kpis).forEach(([key, item]) => {

                const contenedor = document.getElementById(`kpi-${key.replaceAll('_', '-')}`);
                if (!contenedor) return;

                const card = contenedor.closest('.kpis');
                if (!card) return;

                contenedor.querySelector('label').textContent = item.titulo;
                contenedor.querySelector('strong').textContent = item.valor;

                // Tooltip en toda la tarjeta
                card.setAttribute('data-bs-toggle', 'tooltip');
                card.setAttribute('data-bs-title', item.tooltip ?? '');

                bootstrap.Tooltip.getOrCreateInstance(card);

            });

        }

        /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

        function renderGrafica(datos = []) {

            if (chart) chart.destroy();

            const labels = datos.map(item => item.label);

            chart = new Chart(ctx_Ventas, {

                type: 'line',
                data: {

                    labels,

                    datasets: [
                        {
                            label: 'Ingresos (C$)',
                            data: datos.map(item => Number(item.total ?? 0) ),
                            backgroundColor: Colores.colores_2,
                            borderWidth: 1,
                            tension: 0.5,
                            yAxisID: 'y',
                        },
                    ]
                },

                options: {

                    scales: {

                        x: {

                            ticks: {

                                callback: function(value) {

                                    const label = this.getLabelForValue(value);

                                    return EjeXDashboard(label);
                                }
                            }
                        }
                    },

                    responsive: true,
                    maintainAspectRatio: false,

                    plugins: {

                        legend: { display: false },

                        tooltip: {

                            callbacks: {
                                
                                title: function(context) {
                                    const item = datos[context[0].dataIndex];
                                    return formatearFechaDashboard(item.label);
                                },

                                label: function (context) {

                                    const item = datos[context.dataIndex];
                                    const total = Number(item.total ?? 0);
                                    const cantidad = Number( item.cantidad ?? item.ventas ?? 0 );

                                    if (context.datasetIndex === 0) { return `Ingresos: ${moneda(total)}`;}
                                    return `Ventas: ${cantidad.toLocaleString('es-NI')}`;
                                }
                            }
                        }
                    }
                }
            });
        }

        function renderGraficaCantidad(datos = []) {

            if (chartCantidad) chartCantidad.destroy();

            const labels = datos.map(item => String(item.label));
            
            chartCantidad = new Chart(ctx_Cantidad, {

                type: 'pie',

                data: {

                    labels,

                    datasets: [
                        {
                            label: 'Cantidad de ventas',
                            data: datos.map(item => Number(item.cantidad ?? item.ventas ?? 0)),
                            backgroundColor: Colores.colores_2,
                            borderWidth: 1,
                        }
                    ]
                },

                options: {

                  responsive:true, maintainAspectRatio:false,


                    plugins: {
                        legend: { display: true,  position: 'left', labels: { boxWidth: 15, padding: 10, font: { size: 12 } } },

                        tooltip: {

                            callbacks: {

                                label: function(context) {
                                    return ` Ventas: ${context.raw.toLocaleString('es-NI')}`;
                                }
                            }
                        }

                    },

                    scales: {
                        // x: { ticks: { callback: function(value) { const label = this.getLabelForValue(value); } }},
                        // y: { beginAtZero: true }
                    }
                }
            });
        }

        /* ═══════════════════════ [EVENTOS] ═══════════════════════ */

        // Filtro_Ventas.addEventListener('change', obtenerVentas);
        document.querySelectorAll('input[name="Filtro-Ventas"]').forEach(radio => {
            radio.addEventListener('change', obtenerVentas);
        });

        //SIRVE PARA PONER LA FECHA DE FIN EN EL DIA DE HOY Y FIN HACE 3 MESES
        // function establecerRangoFechas() {
        //     const hoy = new Date();
        //     const fechaFin = hoy.toISOString().split('T')[0];
        //     const fechaInicio = new Date();
        //     fechaInicio.setMonth(fechaInicio.getMonth() - 3);
        //     const fechaInicioFormato = fechaInicio.toISOString().split('T')[0];
        //     Fecha_Inicio_Ventas.value = fechaInicioFormato;
        //     Fecha_Fin_Ventas.value = fechaFin;
        //     obtenerVentas();
        // }establecerRangoFechas();

        Fecha_Inicio_Ventas.addEventListener('change', () => { obtenerVentas(); });
        Fecha_Fin_Ventas.addEventListener('change', () => { obtenerVentas(); });

        BTN_Limpiar_Ventas.addEventListener('click', () => {
            document.getElementById('ventas-mes').checked = true;
            ResetearInputs(Fecha_Inicio_Ventas, Fecha_Fin_Ventas); obtenerVentas();
        });

        /* ═══════════════════════ [INICIO] ═══════════════════════ */

        obtenerVentas();
        FlatPickr(Fecha_Inicio_Ventas);
        FlatPickr(Fecha_Fin_Ventas);

        Chart.register(PluginSinDatos);document.addEventListener("turbo:before-fetch-response", (e) => {
        // console.log("SERVER RESPONSE URL:", e.detail.fetchResponse.response.url);
    });


};