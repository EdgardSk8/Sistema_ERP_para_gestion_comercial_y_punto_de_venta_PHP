<div class="modal fade" id="modalEditarProveedor" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Editar Proveedor</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarProveedor" class="row g-3">

                        <input type="hidden" id="editar_id_proveedor">

                        <div class="col-12">
                            <label class="form-label">Nombre del Proveedor</label>
                            <input
                                id="editar_nombre_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del proveedor"
                                maxlength="150"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">RUC</label>
                            <input
                                id="editar_ruc_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Ingrese RUC"
                                maxlength="14">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input
                                id="editar_telefono_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Teléfono"
                                maxlength="15">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Correo</label>
                            <input
                                id="editar_correo_proveedor"
                                type="email"
                                class="form-control form-control-sm"
                                placeholder="Correo electrónico"
                                maxlength="100">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Dirección</label>
                            <input
                                id="editar_direccion_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Dirección del proveedor"
                                maxlength="200">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Estado</label>
                            <select
                                id="editar_estado_proveedor"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Fecha de Creación</label>
                            <input
                                id="editar_fecha_creacion_proveedor"
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
                    id="btnActualizarProveedor"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>
