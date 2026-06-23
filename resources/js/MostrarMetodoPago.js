export default function initMostrarMetodosPagos() {

    document.getElementById('titulo').textContent = 'METODOS DE PAGO';

    $.fn.dataTable.ext.search.push( // Check de métodos de pago inactivos
        function(settings, data, dataIndex) {
            const ocultar = $('#toggleInactivosMetodosPago').is(':checked');
            if (!ocultar) return true;
            const estado = data[2]; // columna estado_metodo_pago
            return estado.includes('Activo');
        }
    );

    $('#toggleInactivosMetodosPago').on('change', function() { tabla.draw(); });

    // Inicializar DataTable
    const tabla = $('#tablaMetodosPago').DataTable({
        processing: true,
        ajax: {
            url: '/metodos-pago/mostrar',
            type: 'GET',
            dataSrc: 'metodos_pago'
        },
        columns: [
            { data: 'nombre_metodo_pago' },
            { data: 'descripcion_metodo_pago' },
            { 
                data: 'estado_metodo_pago',
                render: function(data){
                    return data == 1 
                        ? '<span class="estado estado-activo">Activo</span>'
                        : '<span class="estado estado-inactivo">Inactivo</span>';
                }
            },
            {
                data: 'id_metodo_pago',
                orderable: false,
                searchable: false,
                render: function(data, type, row){

                    let botonEstado = row.estado_metodo_pago == 1 
                        ? `<button class="btn btn-baja bajaMetodoPago" data-id="${data}">
                        
                            <i class="bi bi-person-x"></i> Dar Baja
                        
                        </button>` 

                        : `<button class="btn btn-baja bajaMetodoPago" data-id="${data}">
                        
                            <i class="bi bi-check-circle"></i> Activar
                        
                        </button>`;

                    return `
                    
                        <button class="btn btn-editar editarMetodoPago" data-id="${data}">
                        
                            <i class="bi bi-pencil-square me-1"></i> Editar
                        
                        </button>

                        ${botonEstado}
                    `;
                }
            }
        ],
        columnDefs: [
            // Configurar visibilidad inicial según checkboxes
            { targets: 0, visible: $('.toggle-col[data-column="0"]').is(':checked') },
            { targets: 1, visible: $('.toggle-col[data-column="1"]').is(':checked') },
            { targets: 2, visible: $('.toggle-col[data-column="2"]').is(':checked') },
            { targets: 3, visible: $('.toggle-col[data-column="3"]').is(':checked') },
        ],
    });

    configurarToggleColumnas('tablaMetodosPago');

    // Click en botón Editar
    $('#tablaMetodosPago').on('click', '.editarMetodoPago', function(){
        const id = $(this).data('id');
        abrirModalEditar(id);
    });

    // Abrir modal y llenar datos
    function abrirModalEditar(id) {
        $.get(`/metodos-pago/${id}/editar`, function(res){

            const metodo = res.metodo_pago;

            $('#editar_id_metodo_pago').val(metodo.id_metodo_pago);
            $('#editar_nombre_metodo_pago').val(metodo.nombre_metodo_pago);
            $('#editar_descripcion_metodo_pago').val(metodo.descripcion_metodo_pago);
            $('#editar_estado_metodo_pago').val(metodo.estado_metodo_pago);

            const modal = new bootstrap.Modal(document.getElementById("modalEditarMetodoPago"));
            modal.show();
        });
    }

    // Actualizar método de pago
    $('#btnActualizarMetodoPago').click(function() {

        const nombre = $('#editar_nombre_metodo_pago').val().trim();
        const descripcion = $('#editar_descripcion_metodo_pago').val().trim();
        const estado = $('#editar_estado_metodo_pago').val();
        const id = $('#editar_id_metodo_pago').val();

        if(nombre === ''){
            mostrarToast('El nombre del método de pago es obligatorio', 'danger');
            return;
        }

        const datos = {
            nombre_metodo_pago: nombre,
            descripcion_metodo_pago: descripcion,
            estado_metodo_pago: estado,
            _token: $('meta[name="csrf-token"]').attr('content')
        };

        $.ajax({
            url: `/metodos-pago/${id}/actualizar`,
            type: 'PUT',
            data: datos,
            success: function(res){

                mostrarToast('Método de pago actualizado correctamente', 'success');

                tabla.ajax.reload();

                const modalElement = document.getElementById("modalEditarMetodoPago");
                const modalInstance = bootstrap.Modal.getInstance(modalElement);
                modalInstance.hide();
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

/* ------------------------------------------------------------------------------------------------------ */

    function crearmetododepago() {

        // Click en botón Crear Método de Pago
        $('#btnGuardarMetodoPago').click(function() {

            const nombre = $('#crear_nombre_metodo_pago').val().trim();
            const descripcion = $('#crear_descripcion_metodo_pago').val().trim();

            if(nombre === '') {
                mostrarToast('El nombre del método de pago es obligatorio', 'danger');
                return;
            }

            const datos = {
                nombre_metodo_pago: nombre,
                descripcion_metodo_pago: descripcion,
                _token: $('meta[name="csrf-token"]').attr('content')
            };

            $.ajax({
                url: '/metodos-pago/crear',
                type: 'POST',
                data: datos,
                success: function(res){

                    mostrarToast('Método de pago creado correctamente', 'success');

                    // Limpiar formulario
                    $('#formCrearMetodoPago')[0].reset();

                    // Cerrar modal
                    const modalElement = document.getElementById("modalCrearMetodoPago");
                    const modalInstance = bootstrap.Modal.getInstance(modalElement);
                    if(modalInstance) modalInstance.hide();

                    // Recargar DataTable
                    if($.fn.DataTable.isDataTable('#tablaMetodosPago')){
                        $('#tablaMetodosPago').DataTable().ajax.reload();
                    }
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

        // Limpiar formulario al cerrar modal
        $('#modalCrearMetodoPago').on('hidden.bs.modal', function () { $('#formCrearMetodoPago')[0].reset(); });

    }; crearmetododepago();

/* ------------------------------------------------------------------------------------------------------ */

    document.addEventListener("click", async function(e) {

        if (e.target.classList.contains("bajaMetodoPago")) {

            const id = e.target.dataset.id;
            let modalElement = document.getElementById("modalConfirmarEstadoMetodoPago");

            // Crear modal si no existe
            if (!modalElement) {

                const modalHTML = `
                <div class="modal fade" id="modalConfirmarEstadoMetodoPago" tabindex="-1">
                    <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title">Confirmar acción</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div class="modal-body">
                                ¿Deseas cambiar el estado de este método de pago?
                            </div>

                            <div class="modal-footer">
                                <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                <button class="btn btn-danger" id="confirmarCambioEstadoMetodoPago">Confirmar</button>
                            </div>

                        </div>
                    </div>
                </div>`;

                document.body.insertAdjacentHTML("beforeend", modalHTML);
                modalElement = document.getElementById("modalConfirmarEstadoMetodoPago");
            }

            const modal = new bootstrap.Modal(modalElement);
            modal.show();

            const botonConfirmar = modalElement.querySelector("#confirmarCambioEstadoMetodoPago");

            botonConfirmar.onclick = async function () {

                try {

                    const response = await fetch(`/metodos-pago/cambiar-estado/${id}`, {
                        method: "POST",
                        headers: {
                            "X-CSRF-TOKEN": document
                                .querySelector('meta[name="csrf-token"]')
                                .getAttribute("content")
                        }
                    });

                    const data = await response.json();

                    if (data.success) {

                        mostrarToast("Estado del método de pago actualizado", "success");

                        $('#tablaMetodosPago').DataTable().ajax.reload(null, false);

                    } else {

                        mostrarToast("Error al cambiar estado", "danger");
                    }

                } catch (error) {

                    mostrarToast("Error de conexión", "danger");
                    console.error(error);

                }

                modal.hide();
            };
        }
    });

/* ------------------------------------------------------------------------------------------------------ */


};