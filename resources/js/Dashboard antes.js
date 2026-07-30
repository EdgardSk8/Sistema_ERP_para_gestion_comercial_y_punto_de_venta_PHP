export default function initDashboard() {

    document.getElementById('titulo').textContent = 'Panel Analitico';

    document.querySelectorAll('input[name="dashboard"]').forEach(radio => {

        radio.addEventListener('change', () => {
            moduloActual = radio.value;
            // mostrarToast(radio.value, 'success');
            ObtenerDatos();
        });

    });

    let Chart_Grafica_1 = null;
    let Chart_Grafica_2 = null;
    let Chart_Grafica_3 = null;
    let Chart_Tabla_1 = null;

    let moduloActual = 'ventas';

    const rutasDashboard = {
        ventas: '/dashboard/ventas',
        compras: '/dashboard/compras',
        ganancias: '/dashboard/ganancias',
        Movimiento_inventario: '/dashboard/movimiento-inventario'
    };
    

    const $ = id => document.getElementById(id);

    /* ══════════════════ [ELEMENTOS] ═══════════════════ */

    const Fecha_Inicio   = $('Fecha_Inicio');
    const Fecha_Fin      = $('Fecha_Fin');

    // const Btn_Limpiar_Filtros    = $('Btn_Limpiar_Filtros');
    const Btn_Limpiar_Filtros = document.getElementById('Btn_Limpiar_Filtros');

    const ctx_Grafica_1 = document.getElementById('Chart_1').getContext('2d');
    const ctx_Grafica_2 = document.getElementById('Chart_2').getContext('2d');
    const ctx_Grafica_3 = document.getElementById('Chart_3').getContext('2d');

    /* ══════════════════ [FUNCIONES] ══════════════════ */

    function Obtener_Filtros() { return document.querySelector('input[name="Radio_Filtro"]:checked').value; }

    //FUNCION PARA OBTENER LOS DATOS DE LAS GRAFICAS
    async function ObtenerDatos() {

        const params = new URLSearchParams({ tipo: Obtener_Filtros(), inicio: Fecha_Inicio.value, fin: Fecha_Fin.value });

        const response = await fetch(`${rutasDashboard[moduloActual]}?${params}`);
        const data = await response.json();

        let datos = [];

        switch (Obtener_Filtros()) { default: datos = data.grafica; break; }

        Render_Kpis(data.kpis);
// console.log(data.ui.tabla_1);
        Render_Grafica_1( data.grafica_1, data.ui.grafica_1 );
        Render_Grafica_2( data.grafica_2, data.ui.grafica_2 );
        Render_Grafica_3( data.grafica_3, data.ui.grafica_3 );
        Render_Tabla_1( data.tabla_1, data.ui.tabla_1 );

    }

    // FUNCION PARA ANIMACION DE GRAFICOS AL CAMBIAR EN RADIO BUTTON
    function ActualizarGraficaAnimada(chart, labels, valores, opciones = {}) {

        if (!chart) return false;


        chart.data.labels = labels;

        chart.data.datasets[0].data = valores;


        if (opciones.dataset !== undefined) {
            chart.data.datasets[0].label = opciones.dataset;
        }


        if (opciones.titulo !== undefined) {
            chart.options.plugins.title.text = opciones.titulo;
        }


        chart.update({
            duration: opciones.duration ?? 1000,
            easing: opciones.easing ?? 'easeOutQuart'
        });


        return true;
    }

    // ANIMACION DE TEXTO PARA KPIS
    function AnimarTexto(elemento, texto) {
        if (!elemento) return;
        elemento.animate( [ { opacity: 0 }, { opacity: 1 } ], { duration: 500, easing: 'ease-in' } );
        elemento.textContent = texto ?? '';
    }

    // ANIMACION DE TABLA
    function ActualizarTablaAnimada(tabla, datos) {

        if (!tabla) return false;
        const contenedor = document.querySelector('.Tabla_1');
        tabla.clear();
        tabla.rows.add(datos);
        tabla.draw(false);
        if (contenedor) {

            contenedor.animate(
                [
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                    }
                ],
                {
                    duration: 500,
                    easing: 'ease-out'
                }
            );

        }


        return true;
    }

    /* ═════════════════ [KPIs] ═════════════════ */

    // RENDERIZADO DE KPIS
    function Render_Kpis(kpis) {

        if (!kpis) return;
        Object.values(kpis).forEach((item, index) => {

            const contenedor = document.getElementById(`kpis_${index + 1}`);
            if (!contenedor) return;
            const titulo = contenedor.querySelector('label');
            const valor = contenedor.querySelector('strong');
            AnimarTexto(titulo, item.titulo);
            AnimarTexto(valor, item.valor);

        });

    }

    /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

    function Render_Grafica_1(datos = [], ui = {}) {

        const labels = datos.map(item => item.label);
        const valores = datos.map(item => Number(item.total ?? 0));

        if (ActualizarGraficaAnimada( Chart_Grafica_1, labels, valores, {dataset: ui.dataset ?? '', titulo: ui.titulo ?? ''} )) { return; }

        const gradient = ctx_Grafica_1.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, 'rgba(34, 197, 94, 1)');
        gradient.addColorStop(0.45, 'rgba(34, 197, 94, 0)');

        Chart_Grafica_1 = new Chart(ctx_Grafica_1, {

            type: 'line',
            data: { labels,
                datasets: [
                    {
                        data: datos.map(item => Number(item.total ?? 0)),
                        backgroundColor: gradient,
                        borderColor: '#22c55e',
                        borderWidth: 1,
                        tension: 0.5,
                        fill: true, // COLOR DEL AREA DE ABAJO
                        pointRadius: 3, // TAMANIO DE PUNTOS
                        pointBackgroundColor: '#22c55e', // COLOR DE PUNTOS
                    },
                ]
            },

            options:{
                scales: { x: { ticks: { callback: function(value) { const label = this.getLabelForValue(value); return EjeXDashboard(label); } } } },
                responsive: true, maintainAspectRatio: false,

                plugins: {
                    legend: { display: false },
                    title: { display: true, text: ui.titulo ?? '', font: { size: 12, weight: 'bold' }, padding: { top: 0, bottom: 5 } },

                    tooltip: {

                        callbacks: {
                            title: function(context) { const item = datos[context[0].dataIndex]; return formatearFechaDashboard(item.label); },
                            label: function(context) { const item = datos[context.dataIndex]; const total = Number(item.total ?? 0); 
                                return `${ui.labels?.total ?? ''}: ${moneda(total)}`; }
                        }

                    }

                }

            }

        });

    }

    function Render_Grafica_2(datos = [], ui = {}) {

        const labels = datos.map(item => String(item.label));
        const valores = datos.map(item => Number(item.cantidad ?? 0));

        if (ActualizarGraficaAnimada( Chart_Grafica_2, labels, valores, {dataset: ui.dataset ?? '', titulo: ui.titulo ?? ''} )) { return; }

        Chart_Grafica_2 = new Chart(ctx_Grafica_2, {

            type: 'pie',

            data: {

                labels,

                datasets: [
                    {
                        label: ui.dataset ?? '',

                        data: datos.map(item => Number(item.cantidad ?? 0)),

                        backgroundColor: Colores.colores_2,

                        borderWidth: 1,
                    }
                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    legend: {
                        display: true,
                        position: 'left',
                        labels: {
                            boxWidth: 15,
                            padding: 10,
                            font: {
                                size: 12
                            }
                        }
                    },


                    title: {

                        display: true,

                        text: ui.titulo ?? '',

                        font: {
                            size: 12,
                            weight: 'bold'
                        },

                        padding: {
                            top: 0,
                            bottom: 5
                        }

                    },


                    datalabels: {

                        color: '#fff',

                        font: {
                            weight: 'bold',
                            size: 12
                        },

                        formatter: (value) => {

                            if (value === 0) return '';

                            return value.toLocaleString('es-NI');

                        }

                    },


                    tooltip: {

                        callbacks: {

                            label: function(context) {

                                const item = datos[context.dataIndex];

                                const cantidad = Number(item.cantidad ?? 0);

                                return `${ui.labels?.cantidad ?? ''}: ${cantidad.toLocaleString('es-NI')}`;

                            }

                        }

                    }

                }

            },

            plugins: [ChartDataLabels]

        });

    }

    function Render_Grafica_3(datos = [], ui = {}) {

        const labels = datos.map(item => String(item.label));
        const valores = datos.map(item => Number(item.cantidad ?? 0));

        if (ActualizarGraficaAnimada( Chart_Grafica_3, labels, valores, {dataset: ui.dataset ?? '', titulo: ui.titulo ?? ''} )) { return; }


        Chart_Grafica_3 = new Chart(ctx_Grafica_3, {

            type: 'bar',

            data: {

                labels: datos.map(item => Formato12Horas(item.label)),

                datasets: [
                    {
                        label: ui.dataset ?? '',

                        data: datos.map(item => Number(item.cantidad ?? 0)),

                        backgroundColor: Colores.colores_2,

                        borderWidth: 1
                    }
                ]

            },


            options: {

                responsive: true,

                maintainAspectRatio: false,


                plugins: {

                    title: {

                        display: true,

                        text: ui.titulo ?? '',

                        font: {
                            size: 12,
                            weight: 'bold'
                        },

                        padding: {
                            top: 0,
                            bottom: 5
                        }

                    },


                    legend: {
                        display: false
                    },


                    tooltip: {

                        callbacks: {

                            label(context) {

                                const item = datos[context.dataIndex];

                                return [
                                    `${ui.labels?.cantidad ?? ''}: ${Number(item.cantidad ?? 0).toLocaleString('es-NI')}`,
                                    `${ui.labels?.total ?? ''}: ${moneda(Number(item.total ?? 0))}`
                                ];

                            }

                        }

                    }

                },


                scales: {

                    y: {
                        beginAtZero: true
                    }

                }

            }

        });

    }

    function Render_Tabla_1(datos = [], ui = {}) {

        datos = datos.map(item => ({ label: item.label, cantidad: Number(item.cantidad ?? 0), total: Number(item.total ?? 0) }));
        document.querySelector('.Tabla_1 .Titulo-Tabla').textContent = ui.titulo ?? '';
        if (ActualizarTablaAnimada(Chart_Tabla_1, datos)) { return; }

        Chart_Tabla_1 = jQuery('#Tabla_1').DataTable({

            data: datos,

            columns: [
                { title: '#', data: null, className: 'text-center', render: (data, type, row, meta) => meta.row + 1 },
                { title: ui.columnas?.label ?? '', data: 'label' },
                { title: ui.columnas?.cantidad ?? '', data: 'cantidad', className: 'text-center' },
                { title: ui.columnas?.total ?? '', data: 'total', className: 'text-end', render: data => moneda(Number(data ?? 0)) }
            ], 
            
            paging: false, searching: false, info: false, ordering: false, responsive: true, language: { emptyTable: ui.vacio ?? '' }

        });

    }
    /* ═══════════════════════ [EVENTOS] ═══════════════════════ */

    document.querySelectorAll('input[name="Radio_Filtro"]').forEach(radio => {
        radio.addEventListener('change', ObtenerDatos);
    });

    //SIRVE PARA PONER LA FECHA DE FIN EN EL DIA DE HOY Y FIN HACE 3 MESES
    function InicializarFechasGraficas() {
        const hoy = new Date();
        const fechaFin = hoy.toISOString().split('T')[0];
        const fechaInicio = new Date();
        fechaInicio.setMonth(fechaInicio.getMonth() - 3);
        const fechaInicioFormato = fechaInicio.toISOString().split('T')[0];
        Fecha_Inicio.value = fechaInicioFormato;
        Fecha_Fin.value = fechaFin;
        // ObtenerDatos();
    }

    function ValidarFechas() { if (!Fecha_Inicio.value || !Fecha_Fin.value) { return; } ObtenerDatos(); }
    Fecha_Inicio.addEventListener('change', ValidarFechas);
    Fecha_Fin.addEventListener('change', ValidarFechas);

    Btn_Limpiar_Filtros.addEventListener('click', () => {
        document.getElementById('Mes').checked = true;
        ResetearInputs(Fecha_Inicio, Fecha_Fin); 
        Fecha_Inicio._flatpickr?.clear();
        Fecha_Fin._flatpickr?.clear();
        ObtenerDatos();
    });

    /* ═══════════════════════ [INICIO] ═══════════════════════ */

    ObtenerDatos();
    FlatPickr(Fecha_Inicio);
    FlatPickr(Fecha_Fin);
    InicializarFechasGraficas();

    Chart.register(PluginSinDatos);document.addEventListener("turbo:before-fetch-response", (e) => {
    // console.log("SERVER RESPONSE URL:", e.detail.fetchResponse.response.url);
    });

};