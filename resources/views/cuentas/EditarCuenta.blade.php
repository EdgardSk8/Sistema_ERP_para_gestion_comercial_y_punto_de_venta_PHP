<div class="modal fade" id="modalEditarCuenta" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Editar Cuenta</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarCuenta" class="row g-3">

                        <input type="hidden" id="editar_id_cuenta">

                        <div class="col-12">
                            <label class="form-label">Nombre de la Cuenta</label>
                            <input
                                id="editar_nombre_cuenta"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Ej: Caja General, Banco BAC"
                                maxlength="100"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Tipo de Cuenta</label>
                            <select
                                id="editar_tipo_cuenta"
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

                        <div class="col-md-6">
                            <label class="form-label">Estado</label>
                            <select
                                id="editar_estado_cuenta"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Descripción</label>
                            <textarea
                                id="editar_descripcion_cuenta"
                                class="form-control form-control-sm"
                                placeholder="Descripción opcional"
                                rows="1"
                                maxlength="150"></textarea>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Saldo</label>
                            <input
                                id="editar_saldo_cuenta"
                                type="number"
                                class="form-control form-control-sm"
                                step="0.01"
                                min="0"
                                disabled>
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnActualizarCuenta"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>