<div class="modal fade" id="modalEditarCliente" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Editar Cliente</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarCliente" class="row g-3">

                        <input type="hidden" id="editar_id_cliente">

                        <div class="col-12">
                            <label class="form-label">Nombre del Cliente</label>
                            <input
                                id="editar_nombre_cliente"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del Cliente"
                                maxlength="150"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cédula</label>
                            <input
                                id="editar_cedula_cliente"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="000-000000-0000A"
                                maxlength="16">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">RUC</label>
                            <input
                                id="editar_ruc_cliente"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="RUC del Cliente"
                                maxlength="20">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input
                                id="editar_telefono_cliente"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Teléfono del Cliente"
                                maxlength="20">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Correo</label>
                            <input
                                id="editar_correo_cliente"
                                type="email"
                                class="form-control form-control-sm"
                                placeholder="Correo del Cliente"
                                maxlength="100">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Dirección</label>
                            <input
                                id="editar_direccion_cliente"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Dirección del Cliente"
                                maxlength="200">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Estado</label>
                            <select
                                id="editar_estado_cliente"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Fecha de Creación</label>
                            <input
                                id="editar_fecha_creacion_cliente"
                                type="datetime-local"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnActualizarCliente"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>

<div class="position-fixed bottom-0 end-0 p-3" style="z-index:1080;">

    <div
        id="toastMensaje"
        class="toast text-bg-success border-0"
        role="alert">

        <div class="d-flex">

            <div id="toastTexto" class="toast-body">
                Mensaje
            </div>

            <button
                type="button"
                class="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast">
            </button>

        </div>

    </div>

</div>