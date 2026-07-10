<div class="modal fade" id="modalEditarTipoGasto" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Tipo de Gasto</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarTipoGasto" class="row g-3">

                        <input type="hidden" id="editar_id_tipo_gasto">

                        <div class="col-md-12">
                            <label class="form-label">Nombre del Tipo de Gasto</label>

                            <input
                                id="editar_nombre_tipo_gasto"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del Tipo de Gasto"
                                maxlength="100"
                                required>

                        </div>

                        <div class="col-md-12">
                            <label class="form-label">Descripción</label>

                            <textarea
                                id="editar_descripcion_tipo_gasto"
                                class="form-control form-control-sm"
                                placeholder="Descripción del Tipo de Gasto"
                                rows="1"
                                maxlength="150"></textarea>

                        </div>

                        <div class="col-6">
                            <label class="form-label">Estado</label>

                            <select
                                id="editar_estado_tipo_gasto"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>

                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnActualizarTipoGasto"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>