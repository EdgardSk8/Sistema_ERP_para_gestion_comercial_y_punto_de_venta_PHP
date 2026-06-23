export default function initCompras() {

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔹 VARIABLES */
/* ------------------------------------------------------------------------------------------------------------------- */

    let carrito = [];

    let tabla = $('#tabla_carrito').DataTable({
        paging: false,
        searching: false,
        info: false,
        ordering: false,
    });

    document.getElementById('titulo').textContent = 'REGISTRO DE COMPRAS';

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔹 SELECT2 PRODUCTO (SOLO IMPUESTO + NOMBRE) */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#producto_select').select2({
        ajax: {
            url: '/productos-compra/mostrar',
            dataType: 'json',
            processResults: function (res) {
                return {
                    results: res.data.map(p => ({
                        id: p.id,
                        text: p.text,
                        impuesto: parseFloat(p.impuesto) || 0,
                        precio: parseFloat(p.precio) || 0
                    }))
                };
            }
        }
    });

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔹 SELECT2 PROVEEDOR */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#proveedor').select2({
        ajax: {
            url: '/proveedores-compra/mostrar',
            dataType: 'json',
            processResults: function (res) {
                return { results: res.data };
            }
        }
    });

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔹 SELECTORES AUXILIARES */
/* ------------------------------------------------------------------------------------------------------------------- */

    function cargarTiposFactura() {
        $.get('/tipo-factura-compra/mostrar', function (res) {
            let html = '<option disabled selected>Seleccione tipo factura</option>';
            res.data.forEach(t => {
                html += `<option value="${t.id_tipo_factura}">${t.nombre_tipo_factura}</option>`;
            });
            $('#tipo_factura').html(html);
        });
    }

    function cargarMetodosPago() {
        $.get('/metodo-pago-compra/mostrar', function (res) {
            let html = '<option disabled selected>Seleccione método</option>';
            res.data.forEach(m => {
                html += `<option value="${m.id_metodo_pago}">${m.nombre_metodo_pago}</option>`;
            });
            $('#metodo_pago').html(html);
        });
    }

        $('#cajacuentaselect').on('change', function() {

        const tipoPago = $(this).val();

        if (tipoPago === 'caja') { // Resetea el selector

            $('#caja_select').prop('disabled', false).val('');
            $('#cuenta').prop('disabled', true).val('');

        } else if (tipoPago === 'cuenta') {

            $('#cuenta').prop('disabled', false).val('');
            $('#caja_select').prop('disabled', true).val('');

        } else { $('#caja_select, #cuenta').prop('disabled', true).val(''); }

    });
    function cargarCuentas() {
        $.get('/cuenta-compra/mostrar', function (res) {
            let select = $('#cuenta');
            select.html('<option value="" disabled selected>Seleccione cuenta</option>');

            if (res.success && Array.isArray(res.cuentas)) {
                res.cuentas.forEach(c => {
                    select.append(`<option value="${c.id}">${c.display}</option>`);
                });
            }
        });
    }

    cargarTiposFactura();
    cargarMetodosPago();
    cargarCuentas();



    $(document).on('producto-creado', function(e, p) {

        carrito.push({
            id: p.id,
            nombre: p.nombre,
            cantidad: p.cantidad || 1,
            precio: p.precio || 0,
            precio_original: p.precio,
            precio_compra: p.precio_compra || 0,
            impuesto: p.impuesto || 0,
            descuento: 0
        });

        renderCarrito();
        recalcularTodo();
    });

/* ------------------------------------------------------------------------------------------------------------------- */


/* ═════════════ ( SELECTOR CAJAS ABIERTAS ) ═══════════════ */

    function cargarCajasAbiertas(total = 0) {

        $.get('/caja-compra/mostrar', function(res) {

            let html = '<option value="" disabled selected>Seleccione caja</option>';

            if (!res.data?.length) {
                html += '<option value="" disabled>No hay cajas abiertas</option>';
                $('#caja_select').html(html).prop('disabled', true);
                return;
            }

            html += res.data.map(c => {
                const saldoSuficiente = c.saldo_actual >= total;
                const style = saldoSuficiente ? 'color: green; font-weight: bold;' : 'color: red;';
                const disabled = saldoSuficiente ? '' : 'disabled';
                const label = saldoSuficiente ? c.text : `${c.text} (Saldo insuficiente)`;
                return `<option value="${c.id}" style="${style}" ${disabled}>${label}</option>`;
            }).join('');

            $('#caja_select').html(html);

        });
    }

/* --------------------------------------------------------------------------------------------- */

/* ═════════════ ( ACTUALIZADOR DE PRECIO CAJA ) ═══════════════ */

    const actualizarCajas = () => cargarCajasAbiertas(parseFloat($('#total').val()) || 0);

    actualizarCajas();

/* 🔥 AGREGAR PRODUCTO (PRECIO SOLO USUARIO) */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#btnAgregar').click(function () {

        let data = $('#producto_select').select2('data')[0];

        if (!data) return mostrarToast('Seleccione producto', 'danger');

        let cantidad = parseFloat($('#cantidad').val()) || 0;
        let precio = parseFloat($('#precio_usuario').val()) || 0; // 🔥 USER INPUT

        if (cantidad <= 0) return mostrarToast('Cantidad inválida', 'danger');
        //if (precio <= 0) return mostrarToast('Precio inválido', 'danger');

        let existente = carrito.find(p => p.id === data.id);

        if (existente) {

            existente.cantidad += cantidad;
            existente.precio = precio;
            existente.impuesto = data.impuesto;

        } else {

            carrito.push({
                id: data.id,
                nombre: data.text,
                cantidad,
                precio,
                precio_original: data.precio,
                impuesto: data.impuesto,
                descuento: 0
            });
        }

        renderCarrito();
        recalcularTodo();

        $('#producto_select').val(null).trigger('change');
        $('#cantidad').val(1);
        $('#precio_usuario').val('');
    });

    $('#cantidad').val(1);
    $('#descuento').val(0);
    $('#impuesto').val(0);
    $('#subtotal').val(0);
    $('#total').val(0);

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 RENDER CARRITO */
/* ------------------------------------------------------------------------------------------------------------------- */

    function renderCarrito() {

        tabla.clear();

        carrito.forEach((p, i) => {
            

            let subtotal = (Number(p.precio) || 0) * (Number(p.cantidad) || 0);
            let impuestoValor = subtotal * ((p.impuesto || 0) / 100);
            let totalItem = subtotal + impuestoValor;

            tabla.row.add([
                i + 1,
                p.nombre,

                `<input type="number"
                    class="cantidad"
                    data-index="${i}"
                    placeholder="0"
                    value="${p.cantidad}">`,

                p.precio_original.toFixed(2),

                `<input type="number"
                    class="precio"
                    data-index="${i}"
                    placeholder="0"
                    value="${p.precio > 0 ? p.precio : ''}">`,

                moneda(subtotal),
                moneda(impuestoValor),
                moneda(totalItem),

                `<button class="btn btn-danger btn-sm eliminar" data-index="${i}">
                    <i class="bi bi-trash"></i>
                </button>`
            ]);
        });

        tabla.draw();
    }

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 EVENTOS DINÁMICOS */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#tabla_carrito').on('blur', '.cantidad, .precio', function () {

        let i = $(this).data('index');
        let valor = parseFloat($(this).val()) || 0;

        if (!carrito[i]) return;

        if ($(this).hasClass('cantidad')) carrito[i].cantidad = valor;
        if ($(this).hasClass('precio')) carrito[i].precio = valor;

        recalcularTodo();
        renderCarrito();
    });

    $('#tabla_carrito').on('click', '.eliminar', function () {
        carrito.splice($(this).data('index'), 1);
        recalcularTodo();
    });

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 CÁLCULO GLOBAL REAL */
/* ------------------------------------------------------------------------------------------------------------------- */

    function recalcularTodo() {

        let subtotalGeneral = 0;
        let impuestoGeneral = 0;

        carrito.forEach(p => {

            let subtotal = (p.precio || 0) * (p.cantidad || 0);
            let impuesto = subtotal * ((p.impuesto || 0) / 100);

            subtotalGeneral += subtotal;
            impuestoGeneral += impuesto;
        });

        let descuento = parseFloat($('#descuento').val()) || 0;

        let total = subtotalGeneral + impuestoGeneral - descuento;

        $('#subtotal').val(subtotalGeneral.toFixed(2));
        $('#impuesto').val(impuestoGeneral.toFixed(2));
        $('#total').val(total.toFixed(2));

        //actualizarCajas();
    }

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 CAJAS */
/* ------------------------------------------------------------------------------------------------------------------- */

    // function cargarCajasAbiertas(total = 0) {

    //     $.get('/caja-compra/mostrar', function (res) {

    //         let html = '<option disabled selected>Seleccione caja</option>';

    //         if (!res.data?.length) {
    //             $('#caja_select').html('<option>No hay cajas</option>');
    //             return;
    //         }

    //         html += res.data.map(c => {

    //             let ok = c.saldo_actual >= total;

    //             return `<option value="${c.id}" ${ok ? '' : 'disabled'}>
    //                 ${c.text} ${ok ? '' : '(Saldo insuficiente)'}
    //             </option>`;
    //         }).join('');

    //         $('#caja_select').html(html);
    //     });
    // }

    // function actualizarCajas() {
    //     cargarCajasAbiertas(parseFloat($('#total').val()) || 0);
    // }

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 LIMPIAR */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#btnLimpiar').click(function () {

        carrito = [];
        renderCarrito();

        $('#proveedor, #tipo_factura, #metodo_pago, #cuenta').val(null).trigger('change');

        $('#numero_factura, #subtotal, #total, #impuesto').val('');
        $('#descuento').val(0);
    });

/* ------------------------------------------------------------------------------------------------------------------- */
/* 🔥 REGISTRAR */
/* ------------------------------------------------------------------------------------------------------------------- */

    $('#btnRegistrar').click(function () {

        let data = {
            numero_factura: $('#numero_factura').val(),
            proveedor: $('#proveedor').val(),
            tipo_factura: $('#tipo_factura').val(),
            metodo_pago: $('#metodo_pago').val(),
            caja: $('#caja_select').val(),
            cuenta: $('#cuenta').val(),
            descuento: parseFloat($('#descuento').val()) || 0,
            impuesto: parseFloat($('#impuesto').val()) || 0,
            carrito
        };

        if (!data.proveedor) return mostrarToast('Seleccione proveedor', 'danger');
        if (carrito.length === 0) return mostrarToast('Agregue productos', 'danger');

            if (!data.caja && !data.cuenta) {
            return mostrarToast('Seleccione caja o cuenta', 'danger');
        }

        $.ajax({
            url: '/compra/crear',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(data),
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },

            success: function (res) {
                if (res.success) {
                    mostrarToast('Compra registrada correctamente', 'success');
                    $('#btnLimpiar').click();
                } else {
                    mostrarToast('Error desconocido', 'danger');
                }
            },

            error: function () {
                mostrarToast('Error al registrar compra', 'danger');
            }
        });

    });

/* ------------------------------------------------------------------------------------------------------------------- */

    function crearcompra() {

        // 🚀 Cargar selects (categoría, ubicación, impuesto)
        function cargarSelects() {
            $.get('/productos/formulario?solo_activos=1', function(res){

                const data = res.data;

                // 🏷 Categorías
                $('#crear_id_categoria').empty().append('<option value="">Seleccione</option>');
                data.categorias.forEach(cat => {
                    $('#crear_id_categoria').append(
                        `<option value="${cat.id_categoria}">${cat.nombre_categoria}</option>`
                    );
                });

                // 📍 Ubicaciones
                $('#crear_id_ubicacion').empty().append('<option value="">Seleccione</option>');
                data.ubicaciones.forEach(ubi => {
                    $('#crear_id_ubicacion').append(
                        `<option value="${ubi.id_ubicacion}">${ubi.nombre_ubicacion}</option>`
                    );
                });

                // 💰 Impuestos
                $('#crear_id_impuesto').empty().append('<option value="">Seleccione</option>');
                data.impuestos.forEach(imp => {
                    $('#crear_id_impuesto').append(
                        `<option value="${imp.id_impuesto}" data-iva="${imp.porcentaje_impuesto}">
                            ${imp.nombre_impuesto} (${parseFloat(imp.porcentaje_impuesto)}%)
                        </option>`
                    );
                });

            }).fail(function(){
                mostrarToast('Error al cargar datos del formulario', 'danger');
            });
        }

        // Ejecutar al cargar
        cargarSelects();

        // 🖼 PREVIEW DE IMAGEN
        $('#crear_imagen_producto').on('change', function(e){

            const file = e.target.files[0];
            const preview = $('#preview_imagen_producto');

            if(file){
                const reader = new FileReader();

                reader.onload = function(e){
                    preview.attr('src', e.target.result);
                    preview.removeClass('d-none');
                };

                reader.readAsDataURL(file);
            }
        });


    /* ---------------------------------------------------------------------------------------------------- */

    function inicializarCrearVenta() {

        const checkVenta = $('#crear_check_venta'); 
        const checkRedondeo = $('#crear_redondeo_venta');

        const inputPorcentaje = $('#crear_porcentaje_venta');
        const inputPrecioCompra = $('#crear_precio_compra');
        const inputPrecioVenta = $('#crear_precio_venta'); 
        const inputPrecioTotal = $('#crear_precio_venta_TOTAL');
        const selectImpuesto = $('#crear_id_impuesto');

        let porcentajeOriginal = parseFloat(inputPorcentaje.val()) || 0;
        let bloqueando = false;
        let modoRedondeo = false;

        // 🔹 Habilitar / deshabilitar inputs
        function toggleInputs() {
            if (checkVenta.is(':checked')) {
                inputPorcentaje.prop('disabled', false);
                inputPrecioVenta.prop('disabled', true);
                inputPrecioTotal.prop('disabled', true);
            } else {
                inputPorcentaje.prop('disabled', true);
                inputPrecioVenta.prop('disabled', false);
                inputPrecioTotal.prop('disabled', false);
            }
        }

        // 🔹 Calcular desde % o precio base
        function calcularTodo() {
            if (bloqueando || modoRedondeo) return;
            bloqueando = true;

            let precioCompra = parseFloat(inputPrecioCompra.val()) || 0;
            let iva = parseFloat(selectImpuesto.find(':selected').data('iva')) || 0;

            if (checkVenta.is(':checked')) {
                let porcentaje = parseFloat(inputPorcentaje.val()) || 0;

                let precioBase = precioCompra * (1 + porcentaje / 100);
                let precioTotal = precioBase * (1 + iva / 100);

                inputPrecioVenta.val(precioBase.toFixed(2));
                inputPrecioTotal.val(precioTotal.toFixed(2));

                porcentajeOriginal = porcentaje;

            } else {
                let precioBase = parseFloat(inputPrecioVenta.val()) || 0;

                let precioTotal = precioBase * (1 + iva / 100);
                inputPrecioTotal.val(precioTotal.toFixed(2));
            }

            bloqueando = false;
        }

        // 🔥 Calcular desde TOTAL
        function calcularDesdeTotal() {
            if (bloqueando) return;
            bloqueando = true;

            modoRedondeo = false;

            let precioCompra = parseFloat(inputPrecioCompra.val()) || 0;
            let total = parseFloat(inputPrecioTotal.val()) || 0;
            let iva = parseFloat(selectImpuesto.find(':selected').data('iva')) || 0;

            if (precioCompra <= 0 || total <= 0) {
                bloqueando = false;
                return;
            }

            let precioBase = total / (1 + iva / 100);
            let porcentaje = ((precioBase / precioCompra) - 1) * 100;

            inputPrecioVenta.val(precioBase.toFixed(2));
            inputPorcentaje.val(porcentaje.toFixed(2));

            porcentajeOriginal = porcentaje;

            bloqueando = false;
        }

        // 🔹 Redondeo PRO
        function redondearTotal() {

            modoRedondeo = true;

            let iva = parseFloat(selectImpuesto.find(':selected').data('iva')) || 0;

            if (checkVenta.is(':checked')) {

                let precioCompra = parseFloat(inputPrecioCompra.val()) || 0;

                let totalConIva = precioCompra * (1 + porcentajeOriginal / 100) * (1 + iva / 100);
                let totalRedondeado = Math.ceil(totalConIva);

                let baseRedondeada = totalRedondeado / (1 + iva / 100);
                let nuevoPorcentaje = ((baseRedondeada / precioCompra) - 1) * 100;

                porcentajeOriginal = nuevoPorcentaje;

                inputPorcentaje.val(nuevoPorcentaje.toFixed(3));
                inputPrecioVenta.val(baseRedondeada.toFixed(2));
                inputPrecioTotal.val(totalRedondeado);

            } else {

                let precioBase = parseFloat(inputPrecioVenta.val()) || 0;

                let totalConIva = precioBase * (1 + iva / 100);
                let totalRedondeado = Math.ceil(totalConIva);

                let nuevoPrecioVenta = totalRedondeado / (1 + iva / 100);

                inputPrecioVenta.val(nuevoPrecioVenta.toFixed(2));
                inputPrecioTotal.val(totalRedondeado);
            }
        }

        // 🔹 Inicial
        toggleInputs();
        calcularTodo();

        // 🔄 Eventos
        checkVenta.on('change', () => { 
            modoRedondeo = false;
            toggleInputs(); 
            calcularTodo(); 
        });

        inputPrecioCompra.on('input', () => {
            modoRedondeo = false;
            calcularTodo();
        });

        inputPorcentaje.on('input', () => {
            modoRedondeo = false;
            calcularTodo();
        });

        inputPrecioVenta.on('input', () => {
            modoRedondeo = false;
            calcularTodo();
        });

        selectImpuesto.on('change', () => {
            modoRedondeo = false;
            calcularTodo();
        });

        inputPrecioTotal.on('input', calcularDesdeTotal);

        // 🔹 Botón redondeo
        checkRedondeo.on('click', function(e) {
            e.preventDefault();
            redondearTotal();
            checkRedondeo.prop('checked', false);
        });

        // 🔹 Modal crear
        $('#modalCrearProducto').on('shown.bs.modal', function () {
            modoRedondeo = false;
            toggleInputs();
            calcularTodo();
        });
    }

    // 🚀 INICIALIZAR
    inicializarCrearVenta();

    /* ---------------------------------------------------------------------------------------------------- */

        // 🟢 Guardar producto
        $('#btnGuardarProducto').click(function() {

            const nombre = $('#crear_nombre_producto').val().trim();
            const descripcion = $('#crear_descripcion_producto').val().trim();
            const categoria = $('#crear_id_categoria').val();
            const ubicacion = $('#crear_id_ubicacion').val();
            const impuesto = $('#crear_id_impuesto').val();
            const precioCompra = $('#crear_precio_compra').val();
            const precioVenta = $('#crear_precio_venta').val();
            const stock = $('#crear_stock_actual').val();
            const imagen = $('#crear_imagen_producto')[0].files[0];

            // 🔎 Validaciones
            if(nombre === ''){
                mostrarToast('El nombre del producto es obligatorio', 'danger');
                return;
            }

            if(!categoria || !ubicacion || !impuesto){
                mostrarToast('Debe seleccionar categoría, ubicación e impuesto', 'danger');
                return;
            }

            // 📦 FormData
            const formData = new FormData();

            formData.append('nombre_producto', nombre);
            formData.append('descripcion_producto', descripcion);
            formData.append('id_categoria', categoria);
            formData.append('id_ubicacion', ubicacion);
            formData.append('id_impuesto', impuesto);
            formData.append('precio_compra', precioCompra);
            formData.append('precio_venta', precioVenta);
            formData.append('stock_actual', stock);

            if(imagen){
                formData.append('imagen_producto', imagen);
            }

            formData.append('_token', $('meta[name="csrf-token"]').attr('content'));

            // 🚀 AJAX
            $.ajax({
                url: '/productos/crear',
                type: 'POST',
                data: formData,
                processData: false,
                contentType: false,

            success: function(res) {

                mostrarToast('Producto creado correctamente', 'success');

                let producto = res.producto;

                if (!producto) {
                    console.log("No vino producto");
                    return;
                }

                let cantidad = parseFloat($('#crear_stock_actual').val()) || 1;
                let precio = parseFloat($('#crear_precio_compra').val()) || 0;

                // 🔥 EVENTO DIRECTO AL CARRITO
                $(document).trigger('producto-creado', {
                    id: producto.id,
                    nombre: producto.text,
                    cantidad: cantidad, // ✔️ FIX
                    precio: precio,
                    precio_compra: precio,
                    impuesto: impuesto
                });

                // 🔥 Agregar al select2 (solo UI)
                let newOption = new Option(producto.text, producto.id, true, true);
                $('#producto_select').append(newOption).trigger('change');

                // 🔥 limpiar modal
                $('#formCrearProducto')[0].reset();
                $('#preview_imagen_producto').attr('src','').addClass('d-none');

                const modalElement = document.getElementById("modalCrearProducto");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                if(modalInstance) modalInstance.hide();

                console.log(producto);
            },

                error: function(err){
                    console.error(err);

                    if(err.status === 422){
                        const errores = err.responseJSON.errors;
                        let mensaje = '';

                        for(let campo in errores){
                            mensaje = errores[campo][0];
                            break;
                        }

                        mostrarToast(mensaje, 'danger');
                    } 
                    else if(err.responseJSON && err.responseJSON.mensaje){
                        mostrarToast(err.responseJSON.mensaje, 'danger');
                    } 
                    else {
                        mostrarToast('Error inesperado del servidor', 'danger');
                    }
                }

            });

        });

        // 🧼 Limpiar modal
        $('#modalCrearProducto').on('hidden.bs.modal', function () {
            $('#formCrearProducto')[0].reset();

            $('#preview_imagen_producto')
                .attr('src', '')
                .addClass('d-none');
        });

    }; crearcompra();

/* ------------------------------------------------------------------------------------------------------------------- */


    

};