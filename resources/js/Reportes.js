export default function initReportes() {

    $('input[name="tipo_exportacion"]').on('change', function () {

        $('#btnGenerarReporte').prop('disabled', false);

    });

    // =====================================================
    // GENERAR
    // =====================================================

    $('#btnGenerarReporte').on('click', function () {

        const tipo = $('input[name="tipo_exportacion"]:checked').val();

        if (!tipo) {

            alert('Seleccione un tipo de exportación');
            return;

        }

        if (!$.fn.DataTable.isDataTable('#Reportes')) {

            alert('No hay datos cargados');
            return;

        }

        const tabla = $('#Reportes').DataTable();

        // =====================================================
        // PDF
        // =====================================================

        if (tipo === 'pdf') {

            tabla.button('.buttons-pdf').trigger();

        }

        // =====================================================
        // EXCEL
        // =====================================================

        if (tipo === 'excel') {

            tabla.button('.buttons-excel').trigger();

        }

    });
    
window.AppContext = { usuario: null, credenciales: null };

async function cargarContextoSistema() {

    try {
        const [me, cred] = await Promise.all([
            $.get('/me'),
            $.get('/credenciales/mostrar')
        ]);

        if (me && me.success) { window.AppContext.usuario = me.data; }
        if (cred && cred.success) { window.AppContext.credenciales = cred.data; }

    } catch (error) { console.error('Error cargando contexto:', error); }
}

$(document).ready(function () { cargarContextoSistema(); });

const PlantillaPDF = function (config = {}) {

    return {
        extend: 'pdfHtml5',
        orientation: 'landscape',
        pageSize: 'A4', 
        filename: config.filename || 'REPORTE', 
        title: config.title || 'REPORTE',
        footer: false ,exportOptions: { columns: ':visible' },

        customize: function (doc) {

            const empresaData = window.AppContext?.credenciales || {};
            const usuarioData = window.AppContext?.usuario || {};

            const empresa   = empresaData.nombre_empresa || 'SIN EMPRESA';
            const direccion = empresaData.direccion_empresa || '';
            const telefono  = empresaData.telefono_empresa || '';

            const usuario   = usuarioData.nombre || 'INVITADO';

            const fecha = formatearFechaDiaHora
                ? formatearFechaDiaHora(new Date())
                : new Date().toLocaleString();

            const tipoReporte = config.tipoReporte || 'REPORTE GENERAL';

            // =================================================
            // ESTILO GENERAL
            // =================================================
            doc.pageMargins = [5, 5, 5, 5];

            doc.defaultStyle = {
                fontSize: 9
            };

            // =================================================
            // HEADER PDF
            // =================================================
            doc.content.unshift({
                stack: [

                    {
                        text: empresa,
                        fontSize: 15,
                        bold: true,
                        alignment: 'center',
                        color: '#1f2937'
                    },

                    {
                        text: direccion,
                        alignment: 'center',
                        fontSize: 9,
                        color: '#6b7280'
                    },

                    {
                        // text: telefono,
                        // alignment: 'center',
                        // fontSize: 9,
                        // color: '#6b7280'
                    },

                    {
                        text: tipoReporte,
                        alignment: 'center',
                        fontSize: 12,
                        bold: true,
                        color: '#2563eb',
                        margin: [0, 2, 0, 2]
                    },

                    {
                        text: `Usuario: ${usuario} | ${fecha}`,
                        alignment: 'center',
                        fontSize: 8,
                        color: '#374151'
                    }

                ],
                margin: [0, 0, 0, 10]
            });

            // =================================================
            // BUSCAR TABLA
            // =================================================
            let table = doc.content.find(c => c.table);
                if (!table) return;
            let body = table.table.body;

            // =================================================
            // ESTILO TABLA
            // =================================================
            table.layout = {
                fillColor: function (rowIndex) {
                    return rowIndex === 0 ? '#1f2937' : null;
                },
                hLineColor: () => '#e5e7eb',
                vLineColor: () => '#e5e7eb',
                paddingLeft: () => 6,
                paddingRight: () => 6,
                paddingTop: () => 4,
                paddingBottom: () => 4
            };

            doc.styles.tableHeader = {
                fillColor: '#1f2937',
                color: 'white',
                bold: true,
                fontSize: 10,
                alignment: 'center'
            };

            doc.styles.tableBodyOdd = {
                alignment: 'center'
            };

            doc.styles.tableBodyEven = {
                alignment: 'center'
            };

            // =================================================
            // ZEBRA STRIPES
            // =================================================
            for (let i = 1; i < body.length; i++) {
                body[i].forEach(cell => {
                    cell.fillColor = (i % 2 === 0) ? '#f9fafb' : null;
                });
            }

            // =================================================
            // FOOTER TABLA
            // =================================================
            let lastRow = body[body.length - 1];

            if (lastRow) {
                lastRow.forEach(cell => {
                    cell.fillColor = '#e5e7eb';
                    cell.bold = true;
                });
            }
        }
    };
};


const PlantillaCSV = function (config = {}) {

    return {
        extend: 'csvHtml5',footer: false,exportOptions: { columns: ':visible' },

        customize: function (csv) {

            const empresaData = window.AppContext?.credenciales || {};
            const usuarioData = window.AppContext?.usuario || {};

            const empresa   = empresaData.nombre_empresa || 'SIN EMPRESA';
            const usuario   = usuarioData.nombre || 'INVITADO';

            const fecha = window.formatearFechaDiaHora
                ? window.formatearFechaDiaHora(new Date())
                : new Date().toLocaleString('es-ES');

            const tipoReporte = config.tipoReporte || 'REPORTE GENERAL';

            const header =
`====================================
${empresa}
====================================
REPORTE: ${tipoReporte}
USUARIO: ${usuario}
FECHA: ${fecha}
====================================

`;

            return header + csv;
        }
    };
};


const  PlantillaExcel = function (config = {}) {

    return {
        extend: 'excelHtml5',
        filename: config.filename || 'REPORTE',

        exportOptions: { columns: ':visible' },

        customize: function (xlsx) {

            const sheet = xlsx.xl.worksheets['sheet1.xml'];

            const empresaData = window.AppContext?.credenciales || {};
            const usuarioData = window.AppContext?.usuario || {};

            const empresa = empresaData.nombre_empresa || 'SIN EMPRESA';
            const direccion = empresaData.direccion_empresa || '';
            const telefono = empresaData.telefono_empresa || '';
            const usuario = usuarioData.nombre || 'INVITADO';

            const fecha = window.formatearFechaDiaHora
                ? window.formatearFechaDiaHora(new Date())
                : new Date().toLocaleString('es-ES');

            const tipoReporte = config.tipoReporte || 'REPORTE GENERAL';

            // =========================
            // SHIFT (5 FILAS ARRIBA)
            // =========================
            $('row', sheet).each(function () {
                let r = parseInt($(this).attr('r'));
                $(this).attr('r', r + 5);
            });

            $('c', sheet).each(function () {
                let cell = $(this).attr('r');
                if (!cell) return;

                let col = cell.replace(/[0-9]/g, '');
                let row = parseInt(cell.replace(/[A-Z]/g, ''));

                $(this).attr('r', col + (row + 5));
            });

            // =========================
            // HEADER PRO (con celdas válidas)
            // =========================
            const headerRows = `
                <row r="1">
                    <c r="A1" t="inlineStr"><is><t>${tipoReporte}</t></is></c>
                </row>
                <row r="2">
                    <c r="A2" t="inlineStr"><is><t>${empresa}</t></is></c>
                </row>
                <row r="3">
                    <c r="A3" t="inlineStr"><is><t>${direccion} ${telefono}</t></is></c>
                </row>
                <row r="4">
                    <c r="A4" t="inlineStr"><is><t>Usuario: ${usuario}</t></is></c>
                </row>
                <row r="5">
                    <c r="A5" t="inlineStr"><is><t>${fecha}</t></is></c>
                </row>
            `;

            $('sheetData', sheet).prepend(headerRows);

            // =========================
            // ESTILOS (CENTRADO + NEGRITA)
            // =========================
            $('row[r="1"] c', sheet).attr('s', '2'); // título (más fuerte)
            $('row[r="2"] c', sheet).attr('s', '3'); // empresa
            $('row[r="3"] c, row[r="4"] c, row[r="5"] c', sheet).attr('s', '3');

            // =========================
            // MERGE CELLS (CORRECTO Y SEGURO)
            // =========================
            if ($('mergeCells', sheet).length === 0) {

                const mergeCells =
                    `<mergeCells count="2">
                        <mergeCell ref="A1:H1"/>
                        <mergeCell ref="A2:H2"/>
                    </mergeCells>`;

                $('worksheet', sheet).append(mergeCells);
            }

            // =========================
            // HEADER DE TABLA (fila real después del shift)
            // =========================
            $('row[r="6"] c', sheet).each(function () {
                $(this).attr('s', '4');
            });

            // =========================
            // ALTURA TÍTULO
            // =========================
            $('row[r="1"]', sheet)
                .attr('ht', '28')
                .attr('customHeight', 1);
        }
    };
};

/* ----------------------------------------------------------------------------------------------------- */

    /* EVENTO DE NOMBRAMIENTO DE TITULO */

    $('#titulo').text('REPORTES PARAMETRIZADOS');

    /* INICIALIZACION DE FLATPICKR */

    FlatPickr(FechaInicio);
    flatpickr(FechaFin);

    /* VARIABLES DE ESTADO */

    let cargando = false;
    let tablaReportes = null;
    let requestActual = null;

    /* ESTADO DE MODULO */

    const $fechaInicio = $('#FechaInicio');
    const $fechaFin = $('#FechaFin');
    const $limite = $('#LimiteDatos');
    const Primer_Reporte = $('input[name="reporte"]').first();

    /* MAPEO DE RUTAS */

    const rutasReportes = {
        ventas: '/reportes/ventas',
        inventario: '/reportes/inventario',
        movimientoinventario: '/reportes/movimiento-inventario',
        clientes: '/reportes/clientes',
        usuarios: '/reportes/usuarios',
        cajas: '/reportes/cajas'
    };

    /* FUNCION CONTROL DE FLUJO */

    function recargarReporte() { 
        const reporte = $('input[name="reporte"]:checked').val(); 
        if (reporte) cargarReporte(reporte); 
    }

    const configuracionFiltros = {

    ventas: { columnasSelect: [3, 4, 9, 12] },
    inventario: { columnasSelect: [2, 3, 4] },
    movimientoinventario: { columnasSelect: [2, 5, 6, 9] },
    clientes: { columnasSelect: [1, 4, 8] },
    usuarios: { columnasSelect: [3] },
    cajas: { columnasSelect: [1] }

    };

    const ConfigurarFiltrosDataTable = (tabla, config = {}) => {

        let columnasSelect = config.columnasSelect || [];

        tabla.columns().every(function () {

            let column = this;
            let index = column.index();
            let footer = $(column.footer());
            footer.empty();

            if(columnasSelect.includes(index)){

                let select = $(`<select class="form-select form-select-sm filtro-columna"> <option value="">Todos</option> </select>`)
                .appendTo(footer)
                .on('change', function () {
                    let val = $.fn.dataTable.util.escapeRegex($(this).val());
                    column.search(val ? '^' + val + '$' : '', true, false).draw();
                });

                let valores = [];
                column.data().each(function (d) {
                    d = $('<div>').html(d).text().trim();
                    if(d && !valores.includes(d)){ valores.push(d); }
                });

                valores.sort();
                valores.forEach(function (d) {
                    select.append( `<option value="${d}">${d}</option>` );
                });

            }

            // =========================
            // INPUT
            // =========================

            else{

                $(`
                    <input 
                        type="text" 
                        class="form-control form-control-sm filtro-columna" 
                        placeholder="Buscar"
                    >
                `)
                .appendTo(footer)
                .on('keyup change clear', function () {

                    if(column.search() !== this.value){

                        column
                            .search(this.value)
                            .draw();

                    }

                });

            }

        });

    };

    if (!document.getElementById('Reportes')) {
        return;
    }

    function cargarReporte(reporte) {

        if (cargando) return;
        cargando = true;

        if (requestActual) { requestActual.abort(); }

        requestActual = $.ajax({

            url: rutasReportes[reporte], type: 'GET',
            data: {
                fecha_inicio: $fechaInicio.val(),
                fecha_fin: $fechaFin.val(),
                limite: $limite.val() !== '' ? $limite.val() : null
            },

            success: function (respuesta) {

                cargando = false;
                if (!respuesta.success) return;

                if (!respuesta.datos || !respuesta.columnas) { console.error("RESPUESTA INVÁLIDA:", respuesta); return; }
                destruirTabla();

                $('#Orden-Datos')
                    .off('change.reporte')
                    .on('change.reporte', function () {

                        if (tablaReportes) {
                            tablaReportes.order([0, $(this).val()]).draw();
                        }

                    });

                /* GENERAR THEAD Y TFOOT DINAMICOS */
                let thead = '<tr>';
                let tfoot = '<tr>';

                respuesta.columnas.forEach(col => {

                    thead += `<th>${col.title}</th>`;
                    tfoot += `<th></th>`;

                });

                thead += '</tr>';
                tfoot += '</tr>';

                $('#Reportes').html(`
                    <thead>${thead}</thead>
                    <tfoot>${tfoot}</tfoot>
                    <tbody></tbody>
                `);


                setTimeout(() => {

                    tablaReportes = $('#Reportes').DataTable({

                        ajax: function (data, callback) {

                            //if (requestActual) requestActual.abort();

                            requestActual = $.ajax({
                                url: rutasReportes[reporte], type: 'GET',

                                data: {
                                    fecha_inicio: $fechaInicio.val(),
                                    fecha_fin: $fechaFin.val(),
                                    limite: $limite.val() || null
                                },

                                success: function (respuesta) { callback({ data: respuesta.datos }); }
                            });
                        },

                        /* CONFIGURAR FILTROS */
                        initComplete: function () {

                            ConfigurarFiltrosDataTable(
                                tablaReportes,
                                configuracionFiltros[reporte] || {}
                            );
                        },
                        columns: respuesta.columnas.map(c => ({ data: c.data, title: c.title, defaultContent: "" })),
                        pageLength: 20, dom: 'Bt', buttons: generarBotones(reporte), 
                        columnDefs: [ { targets: "_all", defaultContent: "" } ]
                        

                    });

                }, 0);

            },

            error: function (xhr, status) {

                cargando = false;
                if (status !== 'abort') { console.error("ERROR AJAX:", xhr.responseText); }
            }

        });
    }

    /* GESTION DE ESTADO UI */

    function destruirTabla() {

        if ($.fn.DataTable.isDataTable('#Reportes')) {
            $('#Reportes').DataTable().clear().destroy();
        }

        $('#Reportes').off(); // 🔥 elimina eventos colgados
        $('#Reportes').empty();
    }

    /* FUNCION UTILITARIA */

    function generarNombreArchivo(reporte) {

        const limpio = (reporte || 'REPORTE')
            .toString()
            .toUpperCase()
            .replace(/\s+/g, '_')
            .replace(/[^\w_]/g, '');

        const fecha = window.formatearFechaDiaHora(new Date(), true);
        return `REPORTE DE ${limpio} ${fecha}`;
    }

    function generarBotones(reporte) {

        const nombre = generarNombreArchivo(reporte);

        return [

            PlantillaExcel({ filename: nombre, title: nombre }),
            PlantillaPDF({ filename: nombre, title: nombre }),
            PlantillaCSV({ filename: nombre, title: nombre }),

            { extend: 'copyHtml5', text: '📋 Copiar', className: 'btn btn-secondary' },
            { extend: 'print', text: '🖨️ Imprimir', className: 'btn btn-dark' }

        ];
    }

    /* MANEJO DE EVENTOS */

    $(document).off('change.reporte').on('change.reporte', 'input[name="reporte"]', function () { cargarReporte($(this).val()); });
    $('#limpiafiltroreporte').on('click', function () { $fechaInicio.val(''); $fechaFin.val(''); $limite.val(''); recargarReporte(); });

    $fechaInicio.add($fechaFin).on('change', function () {

        const inicio = $fechaInicio.val();
        const fin = $fechaFin.val();

        if ( (inicio && !fin) || (!inicio && fin) ) {

            Swal.fire({
                icon: 'warning',
                title: 'Fechas incompletas',
                text: 'Debes seleccionar fecha de inicio y fecha fin.'
            });

            return;
        }

        recargarReporte();

    });

    $limite.on('input', recargarReporte);

    if (Primer_Reporte.length) { Primer_Reporte.prop('checked', true); cargarReporte(Primer_Reporte.val()); }
    
};