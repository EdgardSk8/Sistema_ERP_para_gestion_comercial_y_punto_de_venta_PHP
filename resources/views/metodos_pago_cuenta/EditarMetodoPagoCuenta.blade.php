<!-- ╔═══════════ Modal Editar Método Pago - Cuenta ═══════════╗ -->
<div class="modal fade" id="ModalEditarMetodoPagoCuenta" tabindex="-1">
    <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">

            <!-- HEADER -->
            <div class="modal-header bg-primary text-white py-2">
                <h6 class="modal-title">
                    Editar vínculos del método de pago
                </h6>

                <button type="button"
                    class="btn-close btn-close-white"
                    data-bs-dismiss="modal">
                </button>
            </div>

            <!-- BODY -->
            <div class="modal-body py-2">

                <!-- IDS OCULTOS -->
                <input type="hidden" id="editar_id_metodo_pago">
                <input type="hidden" id="editar_id_metodo_pago_cuenta">

                <!-- MÉTODO DE PAGO -->
                <div class="mb-3">

                    <label class="form-label small fw-bold mb-1">
                        Método de pago
                    </label>

                    <input
                        type="text"
                        class="form-control form-control-sm bg-light"
                        id="editar_nombre_metodo_pago"
                        readonly>

                </div>

                <!-- CUENTAS VINCULADAS -->
                <div>

                    <label class="form-label small fw-bold mb-1">
                        Cuentas vinculadas actualmente
                    </label>

                    <div
                        id="editar_listaCuentasVinculadas"
                        class="border rounded bg-light p-1 small"
                        style="max-height: 240px; overflow-y: auto;">

                        <div class="text-muted">
                            Cargando cuentas...
                        </div>

                </div>

    <small class="text-muted d-block mt-1">
        La <strong>X</strong> indica que la cuenta será removida.
    </small>

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
                    class="btn btn-sm btn-primary"
                    id="btnActualizarMetodoPagoCuenta">

                    Guardar cambios

                </button>

            </div>

        </div>
    </div>

    <input type="hidden" id="editar_id_metodo_pago_cuenta">
    <input type="text" id="editar_id_metodo_pago" readonly style="display: none">
</div>