<div class="modal fade" id="modalCrearTipoGasto" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Crear Tipo de Gasto</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearTipoGasto" class="row g-3">

                        <div class="col-md-12">
                            <label class="form-label">Nombre del Tipo de Gasto</label>

                            <input
                                id="crear_nombre_tipo_gasto"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del Tipo de Gasto"
                                maxlength="100"
                                required>

                        </div>

                        <div class="col-md-12">
                            <label class="form-label">Descripción</label>

                            <textarea
                                id="crear_descripcion_tipo_gasto"
                                class="form-control form-control-sm"
                                placeholder="Descripción del Tipo de Gasto"
                                rows="1"
                                maxlength="150"></textarea>

                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnGuardarTipoGasto"
                    type="button"
                    class="btn guardar btn-sm-modal">
                    Guardar
                </button>

            </div>

        </div>

    </div>

</div>