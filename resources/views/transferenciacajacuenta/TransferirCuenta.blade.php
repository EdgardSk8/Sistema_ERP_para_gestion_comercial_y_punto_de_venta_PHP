<div class="modal fade" id="modalTransferir" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Transferencia</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form class="row g-3">

                        <input type="hidden" id="id_caja">

                        <div class="col-12">

                            <div class="small text-muted">

                                <div class="d-flex justify-content-between">
                                    <span>Caja</span>
                                    <span id="infoCaja" class="fw-semibold text-dark"></span>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <span>Fecha</span>
                                    <span id="infoFecha" class="fw-semibold text-dark"></span>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <span>Saldo de Cierre</span>
                                    <span id="infoInicial" class="fw-semibold text-dark"></span>
                                </div>

                                <div class="d-flex justify-content-between">
                                    <span>Saldo actual</span>
                                    <span id="infoFinal" class="fw-semibold text-success"></span>
                                </div>

                            </div>

                        </div>

                        <div class="col-12">

                            <label class="form-label">Monto</label>

                            <div class="position-relative">

                                <span style="
                                    position:absolute;
                                    left:10px;
                                    top:50%;
                                    transform:translateY(-50%);
                                    font-size:0.85rem;">
                                    C$
                                </span>

                                <input
                                    id="monto"
                                    type="number"
                                    min="0.50"
                                    required
                                    class="form-control form-control-sm"
                                    style="padding-left:27px;"
                                    placeholder="0.00">

                            </div>

                        </div>

                        <div class="col-12">

                            <label class="form-label">Saldo restante</label>

                            <input
                                id="saldo_restante"
                                type="text"
                                class="form-control form-control-sm text-center fw-semibold"
                                disabled>

                        </div>

                        <div class="col-12">

                            <label class="form-label">Cuenta destino</label>

                            <select
                                id="cuenta"
                                class="form-select form-select-sm">
                            </select>

                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnGuardarTransferencia"
                    class="btn guardar">
                    Confirmar
                </button>

            </div>

        </div>

    </div>

</div>