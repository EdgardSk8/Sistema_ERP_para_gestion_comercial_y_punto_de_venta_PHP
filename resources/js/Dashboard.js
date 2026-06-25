export default function initDashboard() {

    if (window._ganancias_init) { window._ganancias_init.destroyed = true; }
    window._ganancias_init = {}
    
    let chart = null;
    document.getElementById('titulo').textContent = 'Panel de Ganancias';

    const $ = id => document.getElementById(id);

    /* ══════════════════ [ELEMENTOS] ═══════════════════ */

    const Filtro_Ganancias       = $('Filtro-Ganancias');
    const Tipo_Grafica_Ganancias = $('Tipo-Grafica-Ganancias');

    const Select_Anio_Ganancias  = $('Select-Anio-Ganancias');
    const Select_Mes_Ganancias   = $('Select-Mes-Ganancias');
    const Select_Dia_Ganancias   = $('Select-Dia-Ganancias');

    const Fecha_Inicio_Ganancias  = $('Fecha-Inicio-Ganancias');
    const Fecha_Fin_Ganancias     = $('Fecha-Fin-Ganancias');

    const BTN_Limpiar_Ganancias   = $('BTN-Limpiar-Ganancias');

    const ctx_Ganancias = $('chartGanancias');

    /* ══════════════════ [SELECTORES] ══════════════════ */

    async function Cargar_Anios_Ganancias() {

        const response = await fetch('/dashboard/ganancias');
        const data = await response.json();

        const anios = [
            ...new Set(
                data.grafica.map(item => {
                    const fecha = new Date(item.label);
                    if (isNaN(fecha)) return null;
                    return fecha.getFullYear();
                }).filter(Boolean)
            )
        ];

        Select_Anio_Ganancias.innerHTML = `<option value="">Año</option>`;

        anios.sort((a, b) => b - a)
            .forEach(anio => {
                Select_Anio_Ganancias.innerHTML += `
                    <option value="${anio}">${anio}</option>
                `;
            });
    }

    function Cargar_Meses_Ganancias() {

        Select_Mes_Ganancias.innerHTML = `<option value="">Mes</option>`;

        Meses.forEach((mes, index) => {
            Select_Mes_Ganancias.innerHTML += `
                <option value="${index + 1}">${mes}</option>
            `;
        });
    }

    function Cargar_Dias_Ganancias() {

        const anio = Number(Select_Anio_Ganancias.value);
        const mes  = Number(Select_Mes_Ganancias.value);

        Select_Dia_Ganancias.innerHTML = `<option value="">Día</option>`;

        if (!anio || !mes) return;

        const totalDias = new Date(anio, mes, 0).getDate();

        for (let i = 1; i <= totalDias; i++) {
            Select_Dia_Ganancias.innerHTML += `
                <option value="${i}">${i}</option>
            `;
        }
    }

    /* ══════════════════ [FUNCIONES] ══════════════════ */

    async function obtenerGanancias() {

        const params = new URLSearchParams({

            tipo: Filtro_Ganancias.value,

            anio: Select_Anio_Ganancias.value,
            mes: Select_Mes_Ganancias.value,
            dia: Select_Dia_Ganancias.value,

            inicio: Fecha_Inicio_Ganancias.value,
            fin: Fecha_Fin_Ganancias.value

        });

        const response = await fetch(`/dashboard/ganancias?${params}`);
        const data = await response.json();

        let datos = [];

        switch (Filtro_Ganancias.value) {

            default:
                datos = data.grafica;
                break;
        }

        renderGrafica(datos);
        renderKPIs(data.kpis);

    }

    /* ═════════════════ [KPIs] ═════════════════ */

    function renderKPIs(kpis) {

        if (!kpis) return;

            document.getElementById('kpi-ganancia-total').innerText = moneda(kpis.ganancia_total ?? 0);
            document.getElementById('kpi-ingresos').innerText = moneda(kpis.ingresos ?? 0);
            document.getElementById('kpi-ganancia-unidad').innerText = moneda(kpis.ganancia_por_unidad ?? 0);
            document.getElementById('kpi-margen-venta').innerText = `${Number(kpis.margen_por_venta ?? 0).toFixed(2)}%`;
            document.getElementById('kpi-ventas-totales').innerText = Number(kpis.ventas_totales ?? 0).toLocaleString('es-NI');
        }

    /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

    function renderGrafica(datos = []) {

        if (chart) chart.destroy();

        const labels = datos.map(item => item.label);

        chart = new Chart(ctx_Ganancias, {

            type: Tipo_Grafica_Ganancias.value,

            data: {

                labels,

                datasets: [
                    {
                        label: 'Ganancias (C$)',
                        data: datos.map(item => Number(item.ganancia ?? 0)),
                        backgroundColor: Colores.colores_2,
                        borderWidth: 1,
                        tension: 0.4,
                        fill: Tipo_Grafica_Ganancias.value === 'line',
                        yAxisID: 'y',
                    }
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

                    tooltip: {

                        callbacks: {

                            title: function(context) {
                                const item = datos[context[0].dataIndex];
                                return formatearFechaDashboard(item.label);
                            },

                            label: function (context) {
                                const item = datos[context.dataIndex];
                                const ganancia = Number(item.ganancia ?? 0);
                                return `Ganancia: ${moneda(ganancia)}`;
                            }
                        }
                    }
                }
            }
        });
    }

    /* ═══════════════════════ [EVENTOS] ═══════════════════════ */

    Filtro_Ganancias.addEventListener('change', obtenerGanancias);
    Tipo_Grafica_Ganancias.addEventListener('change', obtenerGanancias);

    Select_Anio_Ganancias.addEventListener('change', () => {
        ResetearInputs(Select_Mes_Ganancias);
        Select_Mes_Ganancias.disabled = !Select_Anio_Ganancias.value;
        Cargar_Dias_Ganancias();
        ResetearInputs(Fecha_Inicio_Ganancias, Fecha_Fin_Ganancias);
        obtenerGanancias();
    });

    Select_Mes_Ganancias.addEventListener('change', () => {
        ResetearInputs(Select_Dia_Ganancias);
        Select_Dia_Ganancias.disabled = !Select_Mes_Ganancias.value;
        Cargar_Dias_Ganancias();
        ResetearInputs(Fecha_Inicio_Ganancias, Fecha_Fin_Ganancias);
        obtenerGanancias();
    });

    Select_Dia_Ganancias.addEventListener('change', () => {
        ResetearInputs(Fecha_Inicio_Ganancias, Fecha_Fin_Ganancias);
        obtenerGanancias();
    });

    Fecha_Inicio_Ganancias.addEventListener('change', () => {
        ResetearInputs(Select_Anio_Ganancias, Select_Mes_Ganancias, Select_Dia_Ganancias);
        obtenerGanancias();
    });

    Fecha_Fin_Ganancias.addEventListener('change', () => {
        ResetearInputs(Select_Anio_Ganancias, Select_Mes_Ganancias, Select_Dia_Ganancias);
        obtenerGanancias();
    });

    BTN_Limpiar_Ganancias.addEventListener('click', () => {

        Filtro_Ganancias.value = 'dia';
        Tipo_Grafica_Ganancias.value = 'bar';

        ResetearInputs(
            Select_Anio_Ganancias,
            Select_Mes_Ganancias,
            Select_Dia_Ganancias,
            Fecha_Inicio_Ganancias,
            Fecha_Fin_Ganancias
        );

        obtenerGanancias();
    });

    /* ═══════════════════════ [INICIO] ═══════════════════════ */

    Cargar_Anios_Ganancias();
    Cargar_Meses_Ganancias();
    Cargar_Dias_Ganancias();

    obtenerGanancias();

    FlatPickr(Fecha_Inicio_Ganancias);
    FlatPickr(Fecha_Fin_Ganancias);

    Chart.register(PluginSinDatos);

function initInventario() {

    let chart = null;

    document.getElementById('titulo').textContent = 'Panel Inventario';

    const $ = id => document.getElementById(id);

    /* ══════════════════ [ELEMENTOS] ═══════════════════ */

    const Filtro_Inventario       = $('Filtro-Inventario');
    const Tipo_Grafica_Inventario = $('Tipo-Grafica-Inventario');

    const Select_Anio_Inventario  = $('Select-Anio-Inventario');
    const Select_Mes_Inventario   = $('Select-Mes-Inventario');
    const Select_Dia_Inventario   = $('Select-Dia-Inventario');

    const Fecha_Inicio_Inventario = $('Fecha-Inicio-Inventario');
    const Fecha_Fin_Inventario    = $('Fecha-Fin-Inventario');

    const BTN_Limpiar_Inventario  = $('BTN-Limpiar-Inventario');

    const ctx_Inventario          = $('Chart-Inventario');

    /* ══════════════════ [SELECTORES] ══════════════════ */

    async function Cargar_Anios_Inventario() {

        const response = await fetch('/dashboard/movimiento-inventario');
        const data = await response.json();

        const anios = [
            ...new Set(
                data.grafica.map(item => {

                    const fecha = new Date(item.label);
                    if (isNaN(fecha)) return null;

                    return fecha.getFullYear();
                }).filter(Boolean)
            )
        ];

        Select_Anio_Inventario.innerHTML = `<option value="">Año</option>`;

        anios.sort((a, b) => b - a).forEach(anio => {
            Select_Anio_Inventario.innerHTML += `
                <option value="${anio}">${anio}</option>
            `;
        });
    }

    function Cargar_Meses_Inventario() {

        Select_Mes_Inventario.innerHTML = `<option value="">Mes</option>`;

        Meses.forEach((mes, index) => {
            Select_Mes_Inventario.innerHTML += `
                <option value="${index + 1}">${mes}</option>
            `;
        });
    }

    function Cargar_Dias_Inventario() {

        const anio = Number(Select_Anio_Inventario.value);
        const mes  = Number(Select_Mes_Inventario.value);

        Select_Dia_Inventario.innerHTML = `<option value="">Día</option>`;

        if (!anio || !mes) return;

        const totalDias = new Date(anio, mes, 0).getDate();

        for (let i = 1; i <= totalDias; i++) {
            Select_Dia_Inventario.innerHTML += `
                <option value="${i}">${i}</option>
            `;
        }
    }

    /* ══════════════════ [FUNCIONES] ══════════════════ */

    async function obtenerMovimientos() {

        const params = new URLSearchParams({

            tipo: Filtro_Inventario.value,
            anio: Select_Anio_Inventario.value,
            mes: Select_Mes_Inventario.value,
            dia: Select_Dia_Inventario.value,
            inicio: Fecha_Inicio_Inventario.value,
            fin: Fecha_Fin_Inventario.value
        });

        const response = await fetch(`/dashboard/movimiento-inventario?${params}`);
        const data = await response.json();

        renderKPIs(data.kpis);
        renderGrafica(data.grafica);
    }

    /* ═════════════════ [KPIs] ═════════════════ */

    function renderKPIs(kpis) {

        if (!kpis) return;

        document.getElementById('kpi-total-movimientos').innerText =
            Number(kpis.total_movimientos ?? 0).toLocaleString('es-NI');

        document.getElementById('kpi-entradas').innerText =
            Number(kpis.entradas ?? 0).toLocaleString('es-NI');

        document.getElementById('kpi-salidas').innerText =
            Number(kpis.salidas ?? 0).toLocaleString('es-NI');

        document.getElementById('kpi-ajustes').innerText =
            Number(kpis.ajustes ?? 0).toLocaleString('es-NI');

        document.getElementById('kpi-balance').innerText =
            Number(kpis.balance ?? 0).toLocaleString('es-NI');

        document.getElementById('kpi-promedio').innerText =
            Number(kpis.promedio_movimiento ?? 0).toLocaleString('es-NI', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
    }

    /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

    function renderGrafica(datos = []) {

        if (chart) chart.destroy();

        const labels = datos.map(item => item.label);

        chart = new Chart(ctx_Inventario, {

            type: Tipo_Grafica_Inventario.value,

            data: {

                labels,

                datasets: [
                    {
                        label: 'Entradas',
                        data: datos.map(i => Number(i.entradas ?? 0)),
                        backgroundColor: Colores.colores_1,
                        //borderColor: 'rgb(25, 135, 84)',
                        borderWidth: 1,
                        tension: 0.4,
                        fill: Tipo_Grafica_Inventario.value === 'line'
                    },
                    {
                        label: 'Salidas',
                        data: datos.map(i => Number(i.salidas ?? 0)),
                        backgroundColor: Colores.colores_2,
                        //borderColor: 'rgb(220, 53, 69)',
                        borderWidth: 1,
                        tension: 0.4,
                        fill: Tipo_Grafica_Inventario.value === 'line'
                    },
                    {
                        label: 'Ajustes',
                        data: datos.map(i => Number(i.ajustes ?? 0)),
                        backgroundColor: 'rgba(255, 193, 7, 0.7)',
                        borderColor: 'rgb(255, 193, 7)',
                        borderWidth: 1,
                        tension: 0.4,
                        hidden: true,
                        fill: Tipo_Grafica_Inventario.value === 'line'
                    }
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

                    tooltip: {

                        callbacks: {

                            title: function (context) {
                                return formatearFechaDashboard(
                                    datos[context[0].dataIndex].label
                                );
                            },

                            label: function (context) {

                                const item = datos[context.dataIndex];

                                if (context.dataset.label === 'Entradas')
                                    return `Entradas: ${item.entradas}`;

                                if (context.dataset.label === 'Salidas')
                                    return `Salidas: ${item.salidas}`;

                                return `Ajustes: ${item.ajustes}`;
                            }
                        }
                    }
                }
            }
        });
    }

    /* ═════════════════ [EVENTOS] ═════════════════ */

    Filtro_Inventario.addEventListener('change', obtenerMovimientos);
    Tipo_Grafica_Inventario.addEventListener('change', obtenerMovimientos);

    Select_Anio_Inventario.addEventListener('change', () => {
        ResetearInputs(Select_Mes_Inventario);
        Select_Mes_Inventario.disabled = !Select_Anio_Inventario.value;
        Cargar_Dias_Inventario();
        ResetearInputs(Fecha_Inicio_Inventario, Fecha_Fin_Inventario);
        obtenerMovimientos();
    });

    Select_Mes_Inventario.addEventListener('change', () => {
        ResetearInputs(Select_Dia_Inventario);
        Select_Dia_Inventario.disabled = !Select_Mes_Inventario.value;
        Cargar_Dias_Inventario();
        ResetearInputs(Fecha_Inicio_Inventario, Fecha_Fin_Inventario);
        obtenerMovimientos();
    });

    Select_Dia_Inventario.addEventListener('change', () => {
        ResetearInputs(Fecha_Inicio_Inventario, Fecha_Fin_Inventario);
        obtenerMovimientos();
    });

    Fecha_Inicio_Inventario.addEventListener('change', () => {
        ResetearInputs(Select_Anio_Inventario, Select_Mes_Inventario, Select_Dia_Inventario);
        obtenerMovimientos();
    });

    Fecha_Fin_Inventario.addEventListener('change', () => {
        ResetearInputs(Select_Anio_Inventario, Select_Mes_Inventario, Select_Dia_Inventario);
        obtenerMovimientos();
    });

    BTN_Limpiar_Inventario.addEventListener('click', () => {

        Filtro_Inventario.value = 'dia';
        Tipo_Grafica_Inventario.value = 'bar';

        ResetearInputs(
            Select_Anio_Inventario,
            Select_Mes_Inventario,
            Select_Dia_Inventario,
            Fecha_Inicio_Inventario,
            Fecha_Fin_Inventario
        );

        obtenerMovimientos();
    });

    /* ═════════════════ [INIT] ═════════════════ */

    Cargar_Anios_Inventario();
    Cargar_Meses_Inventario();
    Cargar_Dias_Inventario();
    obtenerMovimientos();

    FlatPickr(Fecha_Inicio_Inventario);
    FlatPickr(Fecha_Fin_Inventario);
};

initInventario();

function initVentas() {

    let chart = null;

    document.getElementById('titulo').textContent = 'Panel Analítico';

    const $ = id => document.getElementById(id);

    /* ══════════════════ [ELEMENTOS] ═══════════════════ */

    const Filtro_Ventas         = $('Filtro-Ventas');
    const Tipo_Grafica_Ventas   = $('Tipo-Grafica-Ventas');

    const Select_Anio_Ventas    = $('Select-Anio-Ventas');
    const Select_Mes_Ventas     = $('Select-Mes-Ventas');
    const Select_Dia_Ventas     = $('Select-Dia-Ventas');

    const Fecha_Inicio_Ventas   = $('Fecha-Inicio-Ventas');
    const Fecha_Fin_Ventas      = $('Fecha-Fin-Ventas');

    const BTN_Limpiar_Ventas    = $('BTN-Limpiar-Ventas');

    const ctx_Ventas            = $('chartVentas');

    /* ══════════════════ [SELECTORES] ══════════════════ */

    async function Cargar_Anios_Ventas() {

        const response = await fetch('/dashboard/ventas');
        const data = await response.json();

        const anios = [
            ...new Set(
                data.grafica.map(item => {

                    const fecha = new Date(item.label);

                    if (isNaN(fecha)) return null;

                    return fecha.getFullYear();

                }).filter(Boolean)
            )
        ];

        Select_Anio_Ventas.innerHTML = `
            <option value="">Año</option>
        `;

        anios
            .sort((a, b) => b - a)
            .forEach(anio => {

                Select_Anio_Ventas.innerHTML += `
                    <option value="${anio}">
                        ${anio}
                    </option>
                `;
            });
    }

    function Cargar_Meses_Ventas() {

        Select_Mes_Ventas.innerHTML = `
            <option value="">Mes</option>
        `;

        Meses.forEach((mes, index) => {

            Select_Mes_Ventas.innerHTML += `
                <option value="${index + 1}">
                    ${mes}
                </option>
            `;
        });
    }

    function Cargar_Dias_Ventas() {

        const anio = Number(Select_Anio_Ventas.value);
        const mes  = Number(Select_Mes_Ventas.value);

        Select_Dia_Ventas.innerHTML = `
            <option value="">Día</option>
        `;

        if (!anio || !mes) return;

        const totalDias = new Date(anio, mes, 0).getDate();

        for (let i = 1; i <= totalDias; i++) {

            Select_Dia_Ventas.innerHTML += `
                <option value="${i}">
                    ${i}
                </option>
            `;
        }
    }

    /* ══════════════════ [FUNCIONES] ══════════════════ */

    async function obtenerVentas() {

        const params = new URLSearchParams({

            tipo: Filtro_Ventas.value,

            anio: Select_Anio_Ventas.value,
            mes: Select_Mes_Ventas.value,
            dia: Select_Dia_Ventas.value,

            inicio: Fecha_Inicio_Ventas.value,
            fin: Fecha_Fin_Ventas.value

        });

        const response = await fetch(`/dashboard/ventas?${params}`);
        const data = await response.json();

        let datos = [];

        switch (Filtro_Ventas.value) {

            case 'clientes':
                datos = data.clientes;
                break;

            case 'usuarios':
                datos = data.usuarios;
                break;

            case 'metodos_pago':
                datos = data.metodos_pago;
                break;

            case 'estado':
                datos = data.estado;
                break;

            case 'dias_fuertes':
                datos = data.dias_fuertes;
                break;

            default:
                datos = data.grafica;
                break;
        }

        renderGrafica(datos);
        renderKPIs(data.kpis);

    }

    /* ═════════════════ [KPIs] ═════════════════ */

    function renderKPIs(kpis) {

        if (!kpis) return;

        document.getElementById('kpi-total-ventas').innerText = Number(kpis.total_ventas ?? 0).toLocaleString('es-NI');
        document.getElementById('kpi-ingresos-venta').innerText = moneda(kpis.ingresos);
        document.getElementById('kpi-unidades-vendidas').innerText = Number(kpis.unidades_vendidas ?? 0).toLocaleString('es-NI');
        document.getElementById('kpi-promedio-venta').innerText = moneda(kpis.promedio_venta);
        document.getElementById('kpi-venta-maxima').innerText = moneda(kpis.venta_maxima);
        document.getElementById('kpi-impuestos') .innerText = moneda(kpis.impuestos);
    }

    /* ═════════════════ [RENDER GRAFICA] ═════════════════ */

    function renderGrafica(datos = []) {

        if (chart) chart.destroy();

        const labels = datos.map(item => item.label);

        chart = new Chart(ctx_Ventas, {

            type: Tipo_Grafica_Ventas.value,

            data: {

                labels,

                datasets: [
                    {
                        label: 'Ingresos (C$)',

                        data: datos.map(item =>
                            Number(item.total ?? 0)
                        ),

                        backgroundColor: Colores.colores_2,
                        borderWidth: 1,
                        tension: 0.4,

                        fill: Tipo_Grafica_Ventas.value === 'line',

                        yAxisID: 'y',
                    },

                    {
                        label: 'Ventas (cantidad)',

                        data: datos.map(item =>
                            Number(item.cantidad ?? item.ventas ?? 0)
                        ),

                        backgroundColor: Colores.colores_1,
                        borderWidth: 2,
                        tension: 0.4,

                        fill: Tipo_Grafica_Ventas.value === 'line',

                        yAxisID: 'y1',
                    }
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

    /* ═══════════════════════ [EVENTOS] ═══════════════════════ */

    Filtro_Ventas.addEventListener('change', obtenerVentas);

    Tipo_Grafica_Ventas.addEventListener('change', obtenerVentas);

    Select_Anio_Ventas.addEventListener('change', () => {

        ResetearInputs(Select_Mes_Ventas);

        Select_Mes_Ventas.disabled = !Select_Anio_Ventas.value;

        Cargar_Dias_Ventas();

        ResetearInputs(
            Fecha_Inicio_Ventas,
            Fecha_Fin_Ventas
        );

        obtenerVentas();
    });

    Select_Mes_Ventas.addEventListener('change', () => {

        ResetearInputs(Select_Dia_Ventas);

        Select_Dia_Ventas.disabled = !Select_Mes_Ventas.value;

        Cargar_Dias_Ventas();

        ResetearInputs(
            Fecha_Inicio_Ventas,
            Fecha_Fin_Ventas
        );

        obtenerVentas();
    });

    Select_Dia_Ventas.addEventListener('change', () => {

        ResetearInputs(
            Fecha_Inicio_Ventas,
            Fecha_Fin_Ventas
        );

        obtenerVentas();
    });

    Fecha_Inicio_Ventas.addEventListener('change', () => {

        ResetearInputs(
            Select_Anio_Ventas,
            Select_Mes_Ventas,
            Select_Dia_Ventas
        );

        obtenerVentas();
    });

    Fecha_Fin_Ventas.addEventListener('change', () => {

        ResetearInputs(
            Select_Anio_Ventas,
            Select_Mes_Ventas,
            Select_Dia_Ventas
        );

        obtenerVentas();
    });

    BTN_Limpiar_Ventas.addEventListener('click', () => {

        Filtro_Ventas.value = 'dia';

        Tipo_Grafica_Ventas.value = 'bar';

        ResetearInputs(

            Select_Anio_Ventas,
            Select_Mes_Ventas,
            Select_Dia_Ventas,

            Fecha_Inicio_Ventas,
            Fecha_Fin_Ventas

        );

        obtenerVentas();
    });

    /* ═══════════════════════ [INICIO] ═══════════════════════ */

    Cargar_Anios_Ventas();

    Cargar_Meses_Ventas();

    Cargar_Dias_Ventas();

    obtenerVentas();

    FlatPickr(Fecha_Inicio_Ventas);

    FlatPickr(Fecha_Fin_Ventas);

    Chart.register(PluginSinDatos);document.addEventListener("turbo:before-fetch-response", (e) => {
    // console.log("SERVER RESPONSE URL:", e.detail.fetchResponse.response.url);
});

};

initVentas();


};