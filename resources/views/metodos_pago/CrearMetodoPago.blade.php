<div class="modal fade" id="modalCrearMetodoPago" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Crear Método de Pago</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearMetodoPago" class="row g-3">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Método de Pago
                            </label>

                            <input
                                id="crear_nombre_metodo_pago"
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
                                id="crear_descripcion_metodo_pago"
                                class="form-control form-control-sm"
                                placeholder="Descripción del método de pago"
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
                    id="btnGuardarMetodoPago"
                    type="button"
                    class="btn guardar">
                    Guardar
                </button>

            </div>


        </div>

    </div>

</div>