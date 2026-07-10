<div class="modal fade" id="modalEditarMetodoPago" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Editar Método de Pago</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarMetodoPago" class="row g-3">


                        <input
                            type="hidden"
                            id="editar_id_metodo_pago">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Método de Pago
                            </label>

                            <input
                                id="editar_nombre_metodo_pago"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del método de pago"
                                maxlength="100"
                                required>

                        </div>


                        <div class="col-12">

                            <label class="form-label">
                                Descripción
                            </label>

                            <textarea
                                id="editar_descripcion_metodo_pago"
                                class="form-control form-control-sm"
                                placeholder="Descripción del método de pago"
                                maxlength="150"
                                rows="1"></textarea>

                        </div>


                        <div class="col-12">

                            <label class="form-label">
                                Estado
                            </label>

                            <select
                                id="editar_estado_metodo_pago"
                                class="form-select form-select-sm">

                                <option value="1">
                                    Activo
                                </option>

                                <option value="0">
                                    Inactivo
                                </option>

                            </select>

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
                    id="btnActualizarMetodoPago"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>


        </div>

    </div>

</div>