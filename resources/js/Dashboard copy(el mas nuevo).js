export default function initDashboard() {

    document.getElementById('titulo').textContent = 'Panel Analitico';

    document.querySelectorAll('input[name="dashboard"]').forEach(radio => {
        radio.addEventListener('change', () => { mostrarToast(radio.value, 'success'); /* Comprobacion */}); 
    });

    let Chart_Grafica_1 = null;
    let Chart_Grafica_2 = null;
    let Chart_Grafica_3 = null;
    let Chart_Tabla_1 = null;
    

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

    async function ObtenerDatos() {

        const params = new URLSearchParams({

            tipo: Obtener_Filtros(),
            inicio: Fecha_Inicio.value,
            fin: Fecha_Fin.value

        });

        const response = await fetch(`/dashboard/ventas?${params}`);
        const data = await response.json();

        let datos = [];

        switch (Obtener_Filtros()) { default: datos = data.grafica; break; }

        Render_Grafica_1(datos);
        Render_Grafica_2(datos);
        Render_Grafica_3(data.horas);
        Render_Kpis(data.kpis);
        Render_Tabla_1(data.productos);

    }

    /* ═════════════════ [KPIs] ═════════════════ */

    function Render_Kpis(kpis) {

        if (!kpis) return;

        Object.values(kpis).forEach((item, index) => {

            const contenedor = document.getElementById(`kpis_${index + 1}`); if (!contenedor) return;
            const card = contenedor.closest('.Card_Kpis'); if (!card) return;
            const icono = card.querySelector('i'); if (icono && item.icono) { icono.className = item.icono; }

            contenedor.querySelector('label').textContent = item.titulo;
            contenedor.querySelector('strong').textContent = item.valor;

            card.setAttribute('data-bs-toggle', 'tooltip');
            card.setAttribute('data-bs-title', item.tooltip ?? '');

            bootstrap.Tooltip.getOrCreateInstance(card);

        });

    }

    /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

    function Render_Grafica_1(datos = []) {

        if (Chart_Grafica_1) Chart_Grafica_1.destroy();

        const labels = datos.map(item => item.label);

        const gradient = ctx_Grafica_1.createLinearGradient(0, 0, 0, 400);

        gradient.addColorStop(0, 'rgba(34, 197, 94, 1)');
        gradient.addColorStop(0.45, 'rgba(34, 197, 94, 0)');

        Chart_Grafica_1 = new Chart(ctx_Grafica_1, {

            type: 'line',

            data: {

                labels,

                datasets: [
                    {
                        label: 'Ingresos (C$)',
                        data: datos.map(item => Number(item.total ?? 0)),

                        backgroundColor: gradient,
                        borderColor: '#22c55e',

                        borderWidth: 1,
                        tension: 0.5,
                        yAxisID: 'y',

                        fill: true,

                        pointRadius: 3,
                        pointBackgroundColor: '#22c55e',
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

                    title: {
                        display: true,
                        text: 'Ingreso por Ventas',
                        font: { size: 12, weight: 'bold' },
                        padding: { top: 0, bottom: 5 }
                    },

                    tooltip: {
                        callbacks: {

                            title: function(context) {
                                const item = datos[context[0].dataIndex];
                                return formatearFechaDashboard(item.label);
                            },

                            label: function(context) {
                                const item = datos[context.dataIndex];
                                const total = Number(item.total ?? 0);
                                const cantidad = Number(item.cantidad ?? item.ventas ?? 0);

                                if (context.datasetIndex === 0) {
                                    return `Ingresos: ${moneda(total)}`;
                                }

                                return `Ventas: ${cantidad.toLocaleString('es-NI')}`;
                            }
                        }
                    }
                }
            }
        });
    }

    function Render_Grafica_2(datos = []) {

        if (Chart_Grafica_2) Chart_Grafica_2.destroy();
        const labels = datos.map(item => String(item.label));
        
        Chart_Grafica_2 = new Chart(ctx_Grafica_2, {

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

                responsive: true, 
                maintainAspectRatio: false,

                plugins: {

                    legend: { display: true, position: 'left', labels: { boxWidth: 15, padding: 10, font: { size: 12 } } },
                    title: { display: true, text: 'Numero de Ventas', font: { size: 12, weight: 'bold' }, padding: { top: 0, bottom: 5 } },
                    
                    datalabels: {
                        color: '#fff', font: { weight: 'bold', size: 12 },
                        formatter: (value, context) => { if (value === 0) { return ''; } return value.toLocaleString('es-NI'); }
                    },

                    tooltip: { callbacks: { label: function(context) { return ` Ventas: ${context.raw.toLocaleString('es-NI')}`; } } }

                }
            }, plugins: [ChartDataLabels]

        });

    }

    function Render_Grafica_3(datos = []) {

        if (Chart_Grafica_3) Chart_Grafica_3.destroy();

        Chart_Grafica_3 = new Chart(ctx_Grafica_3, {

            type: 'bar',

            data: {

                labels: datos.map(item => Formato12Horas(item.label)),

                datasets: [{
                    label: 'Ventas',
                    data: datos.map(item => Number(item.cantidad)),
                    backgroundColor: Colores.colores_2,
                    borderWidth: 1
                }]
            },

            options: {

                responsive: true,
                maintainAspectRatio: false,

                plugins: {

                    title: { display: true, text: 'Ventas por Hora', font: { size: 12, weight: 'bold' }, padding: { top: 0, bottom: 5 } },

                    legend: { display: false },

                    tooltip: {

                        callbacks: {

                            label(context) {
                                const item = datos[context.dataIndex];
                                return [` Ventas: ${item.cantidad}`, ` Ingresos: ${moneda(item.total)}`];
                            }
                        }
                    }
                },

                scales: { y: { beginAtZero: true } }
            }
        });
    }

    function Render_Tabla_1(datos = []) {

        // Convertir tipos
        datos = datos.map(item => ({
            label: item.label,
            cantidad: Number(item.cantidad),
            total: Number(item.total)
        }));

        if (Chart_Tabla_1) {

            Chart_Tabla_1.clear();
            Chart_Tabla_1.rows.add(datos);
            Chart_Tabla_1.draw();

            return;
        }
        const contenedor = jQuery('#Tabla_1').parent();

        contenedor.find('.titulo-tabla').remove();

        contenedor.prepend(`
            <div class="titulo-tabla text-center fw-bold text-secondary" style="font-size:12px;">
                Productos Más Vendidos
            </div>
        `);

        Chart_Tabla_1 = jQuery('#Tabla_1').DataTable({

            data: datos,

            columns: [

                {
                    title: '#',
                    data: null,
                    className: 'text-center',
                    width: '30px',
                    render: (data, type, row, meta) => meta.row + 1
                },

                {
                    title: 'Producto',
                    data: 'label'
                },

                {
                    title: 'Cantidad',
                    data: 'cantidad',
                    className: 'text-center'
                },

                {
                    title: 'Ingresos',
                    data: 'total',
                    className: 'text-end',
                    render: data => moneda(data)
                }
            ],

            paging: false,
            searching: false,
            info: false,
            ordering: false,
            responsive: true,

            language: { emptyTable: 'Sin productos vendidos' }
        });

    }

    /* ═══════════════════════ [EVENTOS] ═══════════════════════ */

    // Filtro_Ventas.addEventListener('change', ObtenerDatos);
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
    }InicializarFechasGraficas();

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

    Chart.register(PluginSinDatos);document.addEventListener("turbo:before-fetch-response", (e) => {
    // console.log("SERVER RESPONSE URL:", e.detail.fetchResponse.response.url);
    });

};