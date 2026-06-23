export default function initMostrarGastos() {

    document.getElementById('titulo').textContent = 'GESTIÓN DE GASTOS';

    /* ═════════════ FILTRO INACTIVOS ═════════════ */

    $.fn.dataTable.ext.search.push(function (settings, data) {

        const ocultar = $('#toggleInactivosGastos').is(':checked');

        if (!ocultar) return true;

        const estado = data[7];

        return estado.includes('Activo');
    });

    $('#toggleInactivosGastos').on('change', function () {
        tabla.draw();
    });

    /* ═════════════ TABLA ═════════════ */

    const tabla = $('#tablaGastos').DataTable({

        processing: true,

        ajax: {
            url: '/gastos/mostrar',
            type: 'GET',
            dataSrc: 'gastos'
        },

        columns: [

            { data: 'nombre_gasto' },
            { data: 'tipo' },
            { data: 'descripcion_gasto' },
            {
                data: 'fecha_pago',
                render: function (data) {
                    return data ? FechaSimple(data) : '-';
                }
            },

            // 🔥 ESTADO DE PAGO (nuevo)
            {
                data: 'estado_pago',
                render: function (data) {

                    const estado = (data || '').toUpperCase();

                    if (estado === 'PAGADO') {
                        return '<span class="estado estado-activo">Pagado</span>';
                    }

                    if (estado === 'ATRASADO') {
                        return '<span class="estado estado-inactivo">Atrasado</span>';
                    }

                    return '<span class="estado estado-pendiente">Sin pagar</span>';
                }
            },

            // 🔹 ÚLTIMA FECHA
            {
                data: 'ultimo_pago_fecha',
                render: function (data) {
                    return data ? FechaSimple(data) : '-';
                }
            },
            // 🔹 ÚLTIMO MONTO
            { data: 'ultimo_pago_monto', render: data => moneda(data) },

            // 🔹 ESTADO ACTIVO / INACTIVO
            {
                data: 'estado_gasto',
                render: function (data) {
                    return data == 1
                        ? '<span class="estado estado-activo">Activo</span>'
                        : '<span class="estado estado-inactivo">Inactivo</span>';
                }
            },

            // 🔹 ACCIONES
            {
                data: 'id_gasto',
                orderable: false,
                searchable: false,
                render: function (data) {

                    return `
                        <button class="btn btn-sm btn-editar editarGasto" data-id="${data}">
                            <i class="bi bi-pencil-square me-1"></i> Editar
                        </button>

                        <button class="btn btn-sm btn-detalle detalleGasto" data-id="${data}">
                            <i class="bi bi-eye me-1"></i> Detalles
                        </button>

                        <button class="btn btn-sm pagar-gasto pagarGasto" data-id="${data}">
                            <i class="bi bi-cash-coin me-1"></i> Pagar
                        </button>
                    `;
                }
            }
        ],

        columnDefs: [
            { targets: 0, visible: $('.toggle-col[data-column="0"]').is(':checked') },
            { targets: 1, visible: $('.toggle-col[data-column="1"]').is(':checked') },
            { targets: 2, visible: $('.toggle-col[data-column="2"]').is(':checked') },
            { targets: 3, visible: $('.toggle-col[data-column="3"]').is(':checked') },
            { targets: 4, visible: $('.toggle-col[data-column="4"]').is(':checked') },
            { targets: 5, visible: $('.toggle-col[data-column="5"]').is(':checked') },
            { targets: 6, visible: $('.toggle-col[data-column="6"]').is(':checked') },
            { targets: 7, visible: $('.toggle-col[data-column="7"]').is(':checked') },
            { targets: 8, visible: $('.toggle-col[data-column="8"]').is(':checked') }
        ],

    });

    /* ═════════════ TOGGLE COLUMNAS ═════════════ */
    
    configurarToggleColumnas('tablaGastos');

    /* ═════════════ EDITAR GASTO ═════════════ */

    $('#tablaGastos').on('click', '.editarGasto', function () {
        const id = $(this).data('id');
        abrirModalEditarGasto(id);
    });

    function abrirModalEditarGasto(id) {

        $.get(`/gastos/editar/${id}`, function (res) {

            const gasto = res.gasto;

            $('#editar_id_gasto').val(gasto.id_gasto);
            $('#editar_nombre_gasto').val(gasto.nombre_gasto);
            $('#editar_descripcion_gasto').val(gasto.descripcion_gasto);
            $('#editar_estado_gasto').val(gasto.estado_gasto);

            cargarTiposGastoEditar(gasto.id_tipo_gasto);

            new bootstrap.Modal(document.getElementById("modalEditarGasto")).show();

        });
    }

    /* ═════════════ TIPOS GASTO ═════════════ */

    function cargarTiposGastoEditar(seleccionado) {

        const select = $('#editar_id_tipo_gasto');

        fetch('/tipo-gasto/mostrar')
            .then(res => res.json())
            .then(data => {

                select.empty();

                const tipos = data.tipos_gasto || [];

                select.append(`<option disabled selected value="">Seleccione</option>`);

                tipos.forEach(tipo => {

                    select.append(`
                        <option value="${tipo.id_tipo_gasto}" 
                            ${Number(tipo.id_tipo_gasto) === Number(seleccionado) ? "selected" : ""}>
                            ${tipo.nombre_tipo_gasto}
                        </option>
                    `);
                });
            })
            .catch(err => console.error(err));
    }

    /* ═════════════ ACTUALIZAR GASTO ═════════════ */

    $('#btnActualizarGasto').click(function () {

        const id = $('#editar_id_gasto').val();

        const datos = {

            nombre_gasto: $('#editar_nombre_gasto').val().trim(),
            descripcion_gasto: $('#editar_descripcion_gasto').val().trim(),
            id_tipo_gasto: $('#editar_id_tipo_gasto').val(),
            estado_gasto: $('#editar_estado_gasto').val(),
            _token: $('meta[name="csrf-token"]').attr('content')
        };

        $.ajax({

            url: `/gastos/actualizar/${id}`,
            type: 'POST',
            data: datos,

            success: function () {

                mostrarToast('Gasto actualizado correctamente', 'success');

                tabla.ajax.reload();

                bootstrap.Modal.getInstance(document.getElementById("modalEditarGasto")).hide();
            },

            error: function (err) {

                if (err.status === 422) {
                    const errores = err.responseJSON.errors;
                    mostrarToast(Object.values(errores)[0][0], 'danger');
                }
                else if (err.responseJSON?.mensaje) {
                    mostrarToast(err.responseJSON.mensaje, 'danger');
                }
                else {
                    mostrarToast('Error inesperado del servidor', 'danger');
                }
            }
        });
    });

    /* ═════════════ RECARGA ═════════════ */

    $('#modalEditarGasto').on('hidden.bs.modal', function () { tabla.ajax.reload(); });

/* ----------------------------------------------------------------------------------------- */

/* Crear Gasto */

    function cargarTipoGasto() {

        FlatPickr(crear_fecha_pago);

        const modal = document.getElementById("modalCrearGasto");
        const selectTipo = document.getElementById("crear_id_tipo_gasto");

        if (!modal || !selectTipo) return;

        modal.addEventListener("shown.bs.modal", async function () {

            // 🔥 evita recargar cada vez que abres el modal
            if (selectTipo.dataset.loaded === "1") return;

            try {

                const res = await fetch("/tipo-gasto/mostrar");
                const data = await res.json();

                selectTipo.innerHTML = '<option disabled selected value="">Seleccione</option>';

                data.tipos_gasto.forEach(tipo => {
                    const option = document.createElement("option");
                    option.value = tipo.id_tipo_gasto;
                    option.textContent = tipo.nombre_tipo_gasto;
                    selectTipo.appendChild(option);
                });

                selectTipo.dataset.loaded = "1";

            } catch (error) {
                mostrarToast("Error al cargar tipos de gasto", "danger");
            }

        });
    }

/* ═══════════════════════════════════════════════════════ */

    $('#btnGuardarGasto').on('click', function () {

        const nombre = $('#crear_nombre_gasto').val().trim();
        const tipo = $('#crear_id_tipo_gasto').val();
        const descripcion = $('#crear_descripcion_gasto').val().trim();
        const fecha_pago = $('#crear_fecha_pago').val();

        if (!nombre) {
            mostrarToast('Ingrese el nombre del gasto', 'danger');
            return;
        }

        if (!tipo) {
            mostrarToast('Seleccione el tipo de gasto', 'danger');
            return;
        }

        $.ajax({
            url: '/gastos/crear',
            method: 'POST',
            data: {
                nombre_gasto: nombre,
                id_tipo_gasto: tipo,
                descripcion_gasto: descripcion,
                fecha_pago: fecha_pago || null,
                _token: $('meta[name="csrf-token"]').attr('content')
            },

            success: function (res) {

                if (res.success) {

                    mostrarToast('Gasto creado correctamente', 'success');

                    const modalEl = document.getElementById('modalCrearGasto');
                    const modal = bootstrap.Modal.getInstance(modalEl);
                    modal.hide();

                    $('#tablaGastos').DataTable().ajax.reload(null, false);

                    limpiarFormularioCrearGasto(); // 🔥 EXTRA

                } else {
                    mostrarToast(res.mensaje || 'Error al crear', 'danger');
                }
            },

            error: function () {
                mostrarToast('Error del servidor', 'danger');
            }
        });
    });

/* ═══════════════════════════════════════════════════════ */
/* 🔥 LIMPIAR FORMULARIO CREAR */
/* ═══════════════════════════════════════════════════════ */

    function limpiarFormularioCrearGasto() {

        $('#crear_nombre_gasto').val('');
        $('#crear_id_tipo_gasto').val('');
        $('#crear_descripcion_gasto').val('');
        $('#crear_fecha_pago').val('');

        const selectTipo = document.getElementById("crear_id_tipo_gasto");

        // 🔥 permite recargar tipos la próxima vez
        if (selectTipo) {
            selectTipo.dataset.loaded = "0";
        }
    }

    /* ═══════════════════════════════════════════════════════ */
    /* 🔥 LIMPIAR AL CERRAR MODAL (EXTRA SEGURIDAD) */
    /* ═══════════════════════════════════════════════════════ */

    $('#modalCrearGasto').on('hidden.bs.modal', function () {
        limpiarFormularioCrearGasto();
    });

    /* ═══════════════════════════════════════════════════════ */
    /* CARGA INICIAL */
    /* ═══════════════════════════════════════════════════════ */

    cargarTipoGasto();

/* ----------------------------------------------------------------------------------------- */

/* Detalle gasto */

    function detallegasto() {

        /* ═══════════════════════════════
            CACHE
        ═══════════════════════════════ */
        let cajasCache = [];
        let cuentasCache = [];

        function cargarOrigenes(callback) {

            let loaded = 0;

            $.get('/gastos-cajas/mostrar', function (res) {
                if (res.success) cajasCache = res.cajas;
                loaded++;
                if (loaded === 2 && callback) callback();
            });

            $.get('/gastos-cuentas/mostrar', function (res) {
                if (res.success) cuentasCache = res.cuentas;
                loaded++;
                if (loaded === 2 && callback) callback();
            });
        }

        cargarOrigenes();

        /* ═══════════════════════════════
            HELPERS
        ═══════════════════════════════ */

        function buildOrigenSelect(m) {

            let html = `<select class="form-select form-select-sm origen-edit">`;
            html += `<option value="">Seleccione</option>`;

            html += `<optgroup label="Cajas">`;

            cajasCache.forEach(c => {
                html += `
                    <option value="caja-${c.id}" ${m.id_caja == c.id ? 'selected' : ''}>
                        Caja #${c.id} - ${c.display}
                    </option>
                `;
            });

            html += `</optgroup><optgroup label="Cuentas">`;

            cuentasCache.forEach(c => {
                html += `
                    <option value="cuenta-${c.id}" ${m.id_cuenta == c.id ? 'selected' : ''}>
                        ${c.display}
                    </option>
                `;
            });

            html += `</optgroup></select>`;

            return html;
        }

        function validarMonto(monto) {

            if (monto === null || monto === '' || isNaN(monto)) {
                mostrarToast('Ingrese un monto válido', 'danger');
                return false;
            }

            if (monto <= 0) {
                mostrarToast('El monto debe ser mayor a 0', 'danger');
                return false;
            }

            return true;
        }

        /* ═══════════════════════════════
            DETALLE
        ═══════════════════════════════ */

        $('#tablaGastos').on('click', '.detalleGasto', function () {

            const id = $(this).data('id');

            $.get(`/gastos/detalle/${id}`, function (res) {

                if (!res.success) {
                    mostrarToast('No se pudo cargar el detalle', 'danger');
                    return;
                }

                const g = res.gasto;

                $('#detalleNombreGasto').text(g.nombre_gasto);
                $('#detalleTipoGasto').text(g.tipo);
                $('#detalleDescripcion').text(g.descripcion_gasto ?? '—');

                $('#detalleUltimoPago').text(
                    g.ultimo_pago_fecha
                        ? formatearFechaDiaHora(g.ultimo_pago_fecha)
                        : 'Nunca'
                );

                let html = '';

                g.movimientos.forEach(m => {

                    let origenTexto = '';

                    if (m.caja) {
                        origenTexto = `Caja #${m.caja}`;
                    } else if (m.cuenta) {
                        origenTexto = `${m.cuenta}`;
                    }

                    html += `
                        <tr data-id="${m.id}">

                            <td>${formatearFechaDiaHora(m.fecha)}</td>

                            <td>
                                <span class="monto-text">${m.monto}</span>
                                <input type="number"
                                    class="form-control form-control-sm d-none monto-edit"
                                    value="${m.monto}">
                            </td>

                            <td>
                                <span class="origen-text">${origenTexto}</span>
                                <div class="d-none origen-edit-container">
                                    ${buildOrigenSelect(m)}
                                </div>
                            </td>

                            <td>${m.usuario.nombre}</td>

                            <td>
                                <button class="btn btn-success btn-sm editarPago">Editar</button>
                                <button class="btn btn-secondary btn-sm cancelarPago d-none">Cancelar</button>
                                <button class="btn btn-primary btn-sm guardarPago d-none">Guardar</button>
                            </td>

                        </tr>
                    `;
                });

                $('#tablaHistorialGasto').html(html);

                new bootstrap.Modal(document.getElementById('modalDetalleGasto')).show();
            });
        });

        /* ═══════════════════════════════
            EDITAR
        ═══════════════════════════════ */

        $('#tablaHistorialGasto').on('click', '.editarPago', function () {

            const tr = $(this).closest('tr');

            tr.find('.monto-text, .origen-text').addClass('d-none');
            tr.find('.monto-edit, .origen-edit-container').removeClass('d-none');

            tr.find('.editarPago').addClass('d-none');
            tr.find('.guardarPago, .cancelarPago').removeClass('d-none');
        });

        /* ═══════════════════════════════
            CANCELAR
        ═══════════════════════════════ */

        $('#tablaHistorialGasto').on('click', '.cancelarPago', function () {

            const tr = $(this).closest('tr');

            tr.find('.monto-text, .origen-text').removeClass('d-none');
            tr.find('.monto-edit, .origen-edit-container').addClass('d-none');

            tr.find('.editarPago').removeClass('d-none');
            tr.find('.guardarPago, .cancelarPago').addClass('d-none');
        });

        /* ═══════════════════════════════
            GUARDAR
        ═══════════════════════════════ */

        $('#tablaHistorialGasto').on('click', '.guardarPago', function () {

            const btn = $(this);

            if (btn.data('loading')) return;
            btn.data('loading', true);

            const tr = $(this).closest('tr');
            const id = tr.data('id');

            const monto = parseFloat(tr.find('.monto-edit').val());
            const origen = tr.find('.origen-edit').val();

            /* VALIDACIONES */
            if (!validarMonto(monto)) {
                btn.data('loading', false);
                return;
            }

            if (!origen) {
                mostrarToast('Seleccione un origen', 'danger');
                btn.data('loading', false);
                return;
            }

            const [tipo, origenId] = origen.split('-');

            $.ajax({
                url: '/gastos/movimiento/editar',
                type: 'POST',
                data: {
                    id_movimiento_gasto: id,
                    monto: monto,
                    id_caja: tipo === 'caja' ? origenId : null,
                    id_cuenta: tipo === 'cuenta' ? origenId : null,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },

                success: function (res) {

                if (res.success) {

                        mostrarToast('Pago actualizado correctamente', 'success');

                        const tr = btn.closest('tr');

                        // 🔥 volver a modo vista
                        tr.find('.monto-text, .origen-text').removeClass('d-none');
                        tr.find('.monto-edit, .origen-edit-container').addClass('d-none');

                        tr.find('.editarPago').removeClass('d-none');
                        tr.find('.guardarPago, .cancelarPago').addClass('d-none');

                        // opcional: actualizar texto en pantalla sin recargar todo
                        tr.find('.monto-text').text(monto);

                        // refresca tabla principal
                        $('#tablaGastos').DataTable().ajax.reload(null, false);
                    } else {
                        mostrarToast(res.mensaje || 'Error al actualizar', 'danger');
                    }
                },

                error: function (xhr) {

                    console.log("STATUS:", xhr.status);
                    console.log("RESPUESTA:", xhr.responseText);

                    mostrarToast('Error del servidor', 'danger');
                },

                complete: function () {
                    btn.data('loading', false);
                }
            });
        });

    }; detallegasto();


/* ----------------------------------------------------------------------------------------- */

/* Pagar Gasto */

    function pagargasto() {

        /* ═══════════════════════════════
            CARGAR CAJAS
        ═══════════════════════════════ */
        function cargarCajas() {

            $.get('/gastos-cajas/mostrar', function (res) {

                if (!res.success) return;

                let html = '<option value="">Seleccione caja</option>';

                res.cajas.forEach(caja => {
                    html += `<option value="${caja.id}" data-saldo="${caja.saldo}">
                                ${caja.display}
                            </option>`;
                });

                $('#pagar_id_caja').html(html);
            });
        }

        /* ═══════════════════════════════
            CARGAR CUENTAS
        ═══════════════════════════════ */
        function cargarCuentas() {

            $.get('/gastos-cuentas/mostrar', function (res) {

                if (!res.success) return;

                let html = '<option value="">Seleccione cuenta</option>';

                res.cuentas.forEach(cuenta => {
                    html += `<option value="${cuenta.id}" data-saldo="${cuenta.saldo}">
                                ${cuenta.display}
                            </option>`;
                });

                $('#pagar_id_cuenta').html(html);
            });
        }

        function validarPago({ monto, id_caja, id_cuenta, fecha }) {

        // ❌ monto vacío
        if (!monto) {
            mostrarToast('Debe ingresar un monto', 'danger');
            return false;
        }

        // ❌ monto cero
        if (monto == 0) {
            mostrarToast('No se permiten pagos en 0', 'danger');
            return false;
        }

        // ❌ monto negativo
        if (monto < 0) {
            mostrarToast('No se permiten pagos negativos', 'danger');
            return false;
        }

        // ❌ sin caja ni cuenta
        if (!id_caja && !id_cuenta) {
            mostrarToast('Debe seleccionar una caja o cuenta', 'danger');
            return false;
        }

        // ❌ ambos seleccionados
        if (id_caja && id_cuenta) {
            mostrarToast('Seleccione solo caja o cuenta, no ambos', 'danger');
            return false;
        }

        // ❌ fecha inválida (si aplica)
        if (fecha && isNaN(new Date(fecha).getTime())) {
            mostrarToast('La fecha ingresada no es válida', 'danger');
            return false;
        }

        return true;
    }

        /* ═══════════════════════════════
            SOLO UNO (CAJA / CUENTA)
        ═══════════════════════════════ */
        $('#pagar_id_caja').on('change', function () {
            if ($(this).val()) $('#pagar_id_cuenta').val('');
        });

        $('#pagar_id_cuenta').on('change', function () {
            if ($(this).val()) $('#pagar_id_caja').val('');
        });

        /* ═══════════════════════════════
            VALIDAR SALDO
        ═══════════════════════════════ */
        function validarSaldo() {

            const monto = parseFloat($('#pagar_monto').val());
            if (!monto || monto <= 0) return;

            const cajaOption = $('#pagar_id_caja option:selected');
            const cuentaOption = $('#pagar_id_cuenta option:selected');

            const saldoCaja = parseFloat(cajaOption.data('saldo') || 0);
            const saldoCuenta = parseFloat(cuentaOption.data('saldo') || 0);

            if ($('#pagar_id_caja').val() && monto > saldoCaja) {
                mostrarToast('El monto supera el saldo de caja', 'danger');
            }

            if ($('#pagar_id_cuenta').val() && monto > saldoCuenta) {
                mostrarToast('El monto supera el saldo de cuenta', 'danger');
            }
        }

        $('#pagar_monto').on('input', validarSaldo);

        /* ═══════════════════════════════
            ABRIR MODAL (CORREGIDO)
        ═══════════════════════════════ */
        $('#tablaGastos').on('click', '.pagarGasto', function () {

            const tabla = $('#tablaGastos').DataTable();
            const fila = tabla.row($(this).closest('tr')).data();

            if (!fila) return;

            // 🔥 abrir modal primero
            const modal = new bootstrap.Modal(document.getElementById('modalPagarGasto'));
            modal.show();

            // 🔥 llenar datos después de abrir
            setTimeout(() => {

                $('#pagar_id_gasto').val(fila.id_gasto);
                $('#pagar_nombre_gasto').val(fila.nombre_gasto);
                $('#pagar_ultimo_pago').val(fila.ultimo_pago_fecha ?? 'Nunca');
                $('#pagar_ultimo_pago').val(
                    fila.ultimo_pago_fecha
                        ? formatearFechaDiaHora(fila.ultimo_pago_fecha)
                        : 'Nunca'
                );
                $('#pagar_ultimo_monto').val(fila.ultimo_pago_monto ?? '0.00');

                $('#pagar_monto').val(fila.ultimo_pago_monto ?? '');

                $('#pagar_id_caja').val('');
                $('#pagar_id_cuenta').val('');

                $('#pagar_renovar_fecha').val('auto');
                $('#grupo_fecha_manual').addClass('d-none');
                $('#pagar_nueva_fecha').val('');

                cargarCajas();
                cargarCuentas();

            }, 150);
        });

        /* ═══════════════════════════════
            PAGAR (ANTI DOBLE CLICK)
        ═══════════════════════════════ */
        $('#btnPagarGasto').on('click', function () {

            const btn = $(this);

            if (btn.data('loading')) return;

            const id_gasto = $('#pagar_id_gasto').val();
            const monto = parseFloat($('#pagar_monto').val());
            const id_caja = $('#pagar_id_caja').val();
            const id_cuenta = $('#pagar_id_cuenta').val();

            const renovar = $('#pagar_renovar_fecha').val();
            const nueva_fecha = $('#pagar_nueva_fecha').val();

            // ✔ VALIDACIÓN CENTRALIZADA
            if (!validarPago({
                monto,
                id_caja,
                id_cuenta,
                fecha: nueva_fecha
            })) {
                return;
            }

            btn.data('loading', true).prop('disabled', true);

            $.ajax({
                url: '/gastos/pagar',
                method: 'POST',
                data: {
                    id_gasto,
                    monto,
                    id_caja: id_caja || null,
                    id_cuenta: id_cuenta || null,
                    renovar_vencimiento: renovar,
                    nueva_fecha: nueva_fecha || null,
                    _token: $('meta[name="csrf-token"]').attr('content')
                },

                success: function (res) {

                    if (res.success) {

                        mostrarToast('Pago registrado correctamente', 'success');

                        bootstrap.Modal.getInstance(
                            document.getElementById('modalPagarGasto')
                        ).hide();

                        $('#tablaGastos').DataTable().ajax.reload(null, false);
                    } else {
                        mostrarToast(res.mensaje || 'Error al pagar', 'danger');
                    }
                },

                error: function () {
                    mostrarToast('Error del servidor', 'danger');
                },

                complete: function () {
                    btn.data('loading', false).prop('disabled', false);
                }
            });
        });

        
    $('#pagar_renovar_fecha').on('change', function () {

        const valor = $(this).val();

        if (valor === 'manual') {
            $('#grupo_fecha_manual').removeClass('d-none');
        } else {
            $('#grupo_fecha_manual').addClass('d-none');
            $('#pagar_nueva_fecha').val('');
        }
    });

        /* ═══════════════════════════════
            LIMPIAR MODAL (CORRECTO)
        ═══════════════════════════════ */
        function limpiarPago() {

            $('#formPagarGasto')[0].reset();

            $('#pagar_id_gasto').val('');
            $('#pagar_id_caja').val('');
            $('#pagar_id_cuenta').val('');

            $('#grupo_fecha_manual').addClass('d-none');
            $('#pagar_nueva_fecha').val('');
        }

        /* ✔ limpiar al cerrar modal */
        $('#modalPagarGasto').on('hidden.bs.modal', function () {
            limpiarPago();
        });

    }; pagargasto();


/* ----------------------------------------------------------------------------------------- */

};