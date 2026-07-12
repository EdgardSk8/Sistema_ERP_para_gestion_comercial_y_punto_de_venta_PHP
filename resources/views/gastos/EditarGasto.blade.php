<div class="modal fade" id="modalEditarGasto" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Gasto</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarGasto" class="row g-3">

                        <input type="hidden" id="editar_id_gasto">

                        <div class="col-md-6">
                            <label class="form-label">Nombre del Gasto</label>
                            <input
                                id="editar_nombre_gasto"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Ej: Pago de luz"
                                maxlength="150"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Tipo de Gasto</label>
                            <select
                                id="editar_id_tipo_gasto"
                                class="form-select form-select-sm"
                                required>
                            </select>
                        </div>

                        <div class="col-md-8">
                            <label class="form-label">Descripción</label>
                            <textarea
                                id="editar_descripcion_gasto"
                                class="form-control form-control-sm"
                                rows="1"
                                placeholder="Detalle del gasto"></textarea>
                        </div>

                        <div class="col-md-4">
                            <label class="form-label">Estado</label>
                            <select
                                id="editar_estado_gasto"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnActualizarGasto"
                    type="button"
                    class="btn actualizar btn-sm-modal">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>