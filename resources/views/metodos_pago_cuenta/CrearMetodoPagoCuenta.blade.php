<!-- ╔═══════════ Modal Método Pago - Cuenta ═══════════╗ -->
<div class="modal fade" id="ModalCrearMetodoPagoCuenta" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header bg-dark text-white py-2">
                <h6 class="modal-title">Vincular método de pago y cuenta</h6>

                <button type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal">
                </button>
            </div>

            <!-- BODY -->
            <div class="modal-body py-2">

                <div class="row">

                    <!-- ═════════════ FORMULARIO ═════════════ -->
                    <div class="col-md-6 border-end">

                        <div class="mb-2">
                            <label class="form-label small mb-0">
                                Método de pago
                            </label>

                            <select
                                class="form-select form-select-sm"
                                id="id_metodo_pago">
                            </select>
                        </div>

                        <div class="mb-2">
                            <label class="form-label small mb-0">
                                Cuenta
                            </label>

                            <select
                                class="form-select form-select-sm"
                                id="id_cuenta">
                            </select>
                        </div>

                        <div class="mb-2">
                            <label class="form-label small mb-0">
                                Estado
                            </label>

                            <select
                                class="form-select form-select-sm"
                                id="estado">
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>

                    </div>

                    <!-- ═════════════ CUENTAS VINCULADAS ═════════════ -->
                    <div class="col-md-6">

                        <label class="form-label small fw-bold mb-2">
                            Cuentas vinculadas
                        </label>

                        <div
                            id="listaCuentasVinculadas"
                            class="border rounded p-2 bg-light"
                            style="min-height:150px; max-height:200px; overflow-y:auto;">

                            <div class="text-muted small">
                                Seleccione un método de pago...
                            </div>

                        </div>

                    </div>

                </div>

                <!-- ═════════════ RESUMEN DE VÍNCULOS ═════════════ -->
                <div>

                    <label class="form-label small fw-bold mb-2">
                        Método de pago → Cuentas vinculadas
                    </label>

                    <div
                        id="resumenVinculosMetodoPago"
                        class="form-control form-control-sm bg-light">

                        <!-- texto explicativo El Metodo de pago (metodo) se vinculara la cuenta (cuenta) -->

                    </div>

                </div>

            </div>

            <!-- FOOTER -->
            <div class="modal-footer py-2">

                <button
                    type="button"
                    class="btn btn-sm btn-secondary"
                    data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    type="button"
                    class="btn btn-sm btn-success"
                    id="btnGuardarMetodoPagoCuenta">
                    Vincular
                </button>

            </div>

        </div>
    </div>
</div>

<div class="toast-container position-fixed top-0 end-0 p-3">

  <div id="toastMensaje" class="toast text-bg-success border-0">

    <div class="d-flex">
      <div class="toast-body" id="toastTexto"></div>
      <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
    </div>

  </div>

</div>