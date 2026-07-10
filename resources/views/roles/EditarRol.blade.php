<div class="modal fade" id="modalEditarRol" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Rol</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarRol" class="row g-3">


                        <input
                            type="hidden"
                            id="editar_id_rol">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Rol
                            </label>

                            <input
                                id="editar_nombre_rol"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del Rol"
                                maxlength="50"
                                required>

                        </div>


                        <div class="col-12">

                            <label class="form-label">
                                Descripción
                            </label>

                            <textarea
                                id="editar_descripcion_rol"
                                class="form-control form-control-sm"
                                placeholder="Descripción del Rol"
                                maxlength="150"
                                rows="2"></textarea>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Estado
                            </label>

                            <select
                                id="editar_estado_rol"
                                class="form-select form-select-sm">

                                <option value="1">
                                    Activo
                                </option>

                                <option value="0">
                                    Inactivo
                                </option>

                            </select>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Fecha de Creación
                            </label>

                            <input
                                id="editar_fecha_creacion_rol"
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
                    id="btnActualizarRol"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>


        </div>

    </div>

</div>