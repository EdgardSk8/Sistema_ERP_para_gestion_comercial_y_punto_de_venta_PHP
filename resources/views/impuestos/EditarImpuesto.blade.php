<div class="modal fade" id="modalEditarImpuesto" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Impuesto</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarImpuesto" class="row g-3">


                        <input
                            type="hidden"
                            id="editar_id_impuesto">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Impuesto
                            </label>

                            <input
                                id="editar_nombre_impuesto"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del impuesto"
                                maxlength="100"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Porcentaje (%)
                            </label>

                            <input
                                id="editar_porcentaje_impuesto"
                                type="number"
                                class="form-control form-control-sm"
                                placeholder="Ejemplo: 15"
                                min="0"
                                max="100"
                                step="0.01"
                                required>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Estado
                            </label>

                            <select
                                id="editar_estado_impuesto"
                                class="form-select form-select-sm">

                                <option value="1">
                                    Activo
                                </option>

                                <option value="0">
                                    Inactivo
                                </option>

                            </select>

                        </div>


                        <div class="col-12">

                            <label class="form-label">
                                Fecha de Creación
                            </label>

                            <input
                                id="editar_fecha_creacion_impuesto"
                                type="datetime-local"
                                class="form-control form-control-sm"
                                disabled>

                        </div>


                    </form>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    class="btn cancelar"
                    data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnActualizarImpuesto"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>


        </div>

    </div>

</div>