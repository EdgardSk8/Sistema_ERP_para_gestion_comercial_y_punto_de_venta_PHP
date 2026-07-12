<div class="modal fade" id="modalEditarMedida" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Editar Medida
                </h5>

                <button class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarMedida" class="row g-3">

                        <input type="hidden" id="editar_id_medida">

                        <div class="col-12">
                            <label class="form-label"> Tipo de Medidas </label>
                            <select id="editar_tipo_medida" class="form-select form-select-sm">
                                <option value=""> Seleccione un tipo de medida </option>
                            </select>
                        </div>

                        <div class="col-12">

                            <label class="form-label">
                                Nombre
                            </label>

                            <input
                                id="editar_nombre_medida"
                                type="text"
                                class="form-control form-control-sm"
                                maxlength="100">

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Abreviatura
                            </label>

                            <input
                                id="editar_abreviatura_medida"
                                type="text"
                                class="form-control form-control-sm"
                                maxlength="20">

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Orden
                            </label>

                            <input
                                id="editar_orden_medida"
                                type="number"
                                class="form-control form-control-sm"
                                min="0">

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Estado
                            </label>

                            <select id="editar_estado_medida" class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>

                        </div>

                        <div class="col-md-6">

                            <label class="form-label">
                                Fecha de Creación
                            </label>

                            <input
                                id="editar_fecha_creacion_medida"
                                type="datetime-local"
                                class="form-control form-control-sm"
                                disabled>

                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button class="btn actualizar btn-sm-modal" id="btnActualizarMedida">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>