<div class="modal fade" id="modalEditarTipoMedida" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Tipo de Medida</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarTipoMedida" class="row g-3">

                        <input type="hidden" id="editar_id_tipo_medida">

                        <div class="col-12">
                            <label class="form-label">Nombre del Tipo de Medida</label>
                            <input
                                type="text"
                                id="editar_nombre_tipo_medida"
                                class="form-control form-control-sm"
                                maxlength="100"
                                required>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Descripción</label>
                            <textarea
                                id="editar_descripcion_tipo_medida"
                                class="form-control form-control-sm"
                                rows="1"
                                maxlength="255"></textarea>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Estado</label>
                            <select id="editar_estado_tipo_medida" class="form-select form-select-sm">
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Fecha de Creación</label>
                            <input
                                type="datetime-local"
                                id="editar_fecha_creacion_tipo_medida"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn actualizar btn-sm-modal" id="btnActualizarTipoMedida">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>