<div class="modal fade" id="ModalTransferirCuenta" tabindex="-1">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Transferir entre cuentas</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form class="row g-3">

                        <div class="col-md-6">
                            <label class="form-label">Cuenta origen</label>
                            <select
                                id="cuenta_origen"
                                class="form-select form-select-sm">
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cuenta destino</label>
                            <select
                                id="cuenta_destino"
                                class="form-select form-select-sm">
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Saldo actual de la cuenta origen</label>
                            <input
                                id="saldo_origen"
                                type="text"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Saldo actual de la cuenta destino</label>
                            <input
                                id="saldo_destino"
                                type="text"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Saldo resultante origen</label>
                            <input
                                id="saldo_origen_resultante"
                                type="text"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Saldo resultante destino</label>
                            <input
                                id="saldo_destino_resultante"
                                type="text"
                                class="form-control form-control-sm"
                                disabled>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Monto a transferir</label>
                            <input
                                id="monto_transferencia"
                                type="text"
                                class="form-control form-control-sm">
                        </div>

                        <div class="col-12">

                            <div class="form-check form-switch">
                                <input
                                    id="check_concepto"
                                    class="form-check-input"
                                    type="checkbox">

                                <label class="form-check-label">
                                    Escribir concepto manual
                                </label>
                            </div>

                        </div>

                        <div class="col-12" id="grupo_selector_concepto">

                            <label class="form-label">Concepto</label>

                            <select
                                id="selector_concepto"
                                class="form-select form-select-sm">

                                <option value="Ajuste de saldos entre cuentas">
                                    Ajuste de saldos entre cuentas
                                </option>

                                <option value="Reorganización de fondos entre cuentas">
                                    Reorganización de fondos entre cuentas
                                </option>

                                <option value="Cobertura de gastos operativos">
                                    Cobertura de gastos operativos
                                </option>

                                <option value="Pago interno desde otra cuenta">
                                    Pago interno desde otra cuenta
                                </option>

                                <option value="Movimiento por control financiero">
                                    Movimiento por control financiero
                                </option>

                            </select>

                        </div>

                        <div class="col-12 d-none" id="grupo_input_concepto">

                            <label class="form-label">Concepto manual</label>

                            <textarea
                                id="input_concepto"
                                class="form-control form-control-sm"
                                rows="1"></textarea>

                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnTransferir"
                    type="button"
                    class="btn guardar">
                    Transferir
                </button>

            </div>

        </div>

    </div>

</div>