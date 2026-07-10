<div class="modal fade" id="modalCrearRol" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Crear Rol</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearRol" class="row g-3">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Rol
                            </label>

                            <input
                                id="crear_nombre_rol"
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
                                id="crear_descripcion_rol"
                                class="form-control form-control-sm"
                                placeholder="Descripción del Rol"
                                maxlength="150"
                                rows="1"></textarea>

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
                    id="btnGuardarRol"
                    type="button"
                    class="btn guardar">
                    Guardar
                </button>

            </div>


        </div>

    </div>

</div>