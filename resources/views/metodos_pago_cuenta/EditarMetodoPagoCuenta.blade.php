<div class="modal fade" id="ModalEditarMetodoPagoCuenta" tabindex="-1">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">


            <div class="modal-header">

                <h5 class="modal-title">
                    Editar vínculos del método de pago
                </h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">


                    <input
                        type="hidden"
                        id="editar_id_metodo_pago">

                    <input
                        type="hidden"
                        id="editar_id_metodo_pago_cuenta">


                    <div class="mb-3">

                        <label class="form-label">
                            Método de pago
                        </label>

                        <input
                            id="editar_nombre_metodo_pago"
                            type="text"
                            class="form-control form-control-sm bg-light"
                            readonly>

                    </div>


                    <div>

                        <label class="form-label">
                            Cuentas vinculadas actualmente
                        </label>


                        <div
                            id="editar_listaCuentasVinculadas"
                            class="border rounded bg-light p-2"
                            style="max-height:220px; overflow-y:auto;">

                            <div class="text-muted small">
                                Cargando cuentas...
                            </div>

                        </div>


                        <small class="text-muted d-block mt-2">
                            La <strong>X</strong> indica que la cuenta será removida.
                        </small>


                    </div>


                </div>

            </div>


            <div class="modal-footer">

                <button
                    class="btn cancelar"
                    data-bs-dismiss="modal">
                    Cancelar
                </button>


                <button
                    id="btnActualizarMetodoPagoCuenta"
                    type="button"
                    class="btn actualizar">
                    Guardar cambios
                </button>

            </div>


        </div>

    </div>

</div>