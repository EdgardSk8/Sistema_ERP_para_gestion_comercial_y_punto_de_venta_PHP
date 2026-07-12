<div class="modal fade" id="modalCrearTipoMedida" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Crear Tipo de Medida</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearTipoMedida" class="row g-3">

                        <div class="col-12">
                            <label class="form-label">Nombre del Tipo de Medida</label>
                            <input
                                type="text"
                                id="crear_nombre_tipo_medida"
                                class="form-control form-control-sm"
                                placeholder="Nombre del tipo de medida"
                                maxlength="100"
                                required>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Descripción</label>
                            <textarea
                                id="crear_descripcion_tipo_medida"
                                class="form-control form-control-sm"
                                rows="1"
                                placeholder="Descripción del tipo de medida"
                                maxlength="255"></textarea>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">
                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn guardar btn-sm-modal" id="btnGuardarTipoMedida">Guardar</button>
            </div>

        </div>

    </div>

</div>