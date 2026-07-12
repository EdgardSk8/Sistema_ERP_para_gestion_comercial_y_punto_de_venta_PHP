<div class="modal fade" id="ModalCrearMetodoPagoCuenta" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">


            <div class="modal-header">

                <h5 class="modal-title">
                    Vincular método de pago y cuenta
                </h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearMetodoPagoCuenta" class="row g-1">


                        <div class="col-md-12">

                            <label class="form-label">
                                Método de pago
                            </label>

                            <select
                                id="id_metodo_pago"
                                class="form-select form-select-sm">
                            </select>

                        </div>


                        <div class="col-md-12">

                            <label class="form-label">
                                Cuenta
                            </label>

                            <select
                                id="id_cuenta"
                                class="form-select form-select-sm">
                            </select>

                        </div>


                        <div class="col-md-6">

                            <label class="form-label">
                                Estado
                            </label>

                            <select
                                id="estado"
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


                    <br>


                    <div>

                        <label class="form-label">
                            Cuentas vinculadas
                        </label>


                        <div
                            id="listaCuentasVinculadas"
                            class="border rounded p-2 bg-light"
                            style="min-height:80px; max-height:120px; overflow-y:auto;">

                            <div class="text-muted small">
                                Seleccione un método de pago...
                            </div>

                        </div>

                    </div>


                    <div class="mt-3">

                        <label class="form-label">
                            Método de pago → Cuentas vinculadas
                        </label>


                        <div
                            id="resumenVinculosMetodoPago"
                            class="form-control form-control-sm bg-light">

                        </div>

                    </div>


                </div>

            </div>


            <div class="modal-footer">

                <button
                    class="btn cancelar btn-sm-modal"
                    data-bs-dismiss="modal">
                    Cancelar
                </button>


                <button
                    id="btnGuardarMetodoPagoCuenta"
                    type="button"
                    class="btn guardar btn-sm-modal">
                    Vincular
                </button>

            </div>


        </div>

    </div>

</div>