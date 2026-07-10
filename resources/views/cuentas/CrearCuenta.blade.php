<div class="modal fade" id="modalCrearCuenta" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Crear Cuenta</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearCuenta" class="row g-3">

                        <div class="col-md-6">
                            <label class="form-label">Nombre de la Cuenta</label>
                            <input
                                id="crear_nombre_cuenta"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Ej: Caja General, Banco BAC"
                                maxlength="100"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Tipo de Cuenta</label>
                            <select
                                id="crear_tipo_cuenta"
                                class="form-select form-select-sm"
                                required>

                                <option value="CAJA">Caja</option>
                                <option value="PAGOS">Pagos</option>
                                <option value="GASTOS">Gastos</option>
                                <option value="IMPUESTOS">Impuestos</option>
                                <option value="AHORRO">Ahorro</option>
                                <option value="RESERVA">Reserva</option>

                            </select>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Descripción</label>
                            <textarea
                                id="crear_descripcion_cuenta"
                                class="form-control form-control-sm"
                                placeholder="Descripción opcional"
                                rows="1"
                                maxlength="150"></textarea>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Saldo Inicial</label>
                            <input
                                id="crear_saldo_cuenta"
                                type="number"
                                class="form-control form-control-sm"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnGuardarCuenta"
                    type="button"
                    class="btn guardar">
                    Guardar
                </button>

            </div>

        </div>

    </div>

</div>