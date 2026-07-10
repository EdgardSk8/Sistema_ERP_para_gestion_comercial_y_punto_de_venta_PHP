<div class="modal fade" id="modalDetalleTransferencias" tabindex="-1">

    <div class="modal-dialog modal-lg modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">
                    Transferencias de Caja: <span id="cajaDetalleTitulo">—</span>
                </h5>

                <button class="btn-close" data-bs-dismiss="modal"></button>

            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <div class="row g-3 mb-3">

                        <div class="col-md-6">
                            <strong>Caja:</strong>
                            <span id="detalleCajaNumero">—</span>
                        </div>

                        <div class="col-md-6 text-md-end">
                            <strong>Cantidad de transferencias:</strong>
                            <span id="detalleCantidadTransferencias">0</span>
                        </div>

                        <div class="col-12">
                            <strong>Total transferido:</strong>
                            <span id="detalleTotalTransferido">C$ 0.00</span>
                        </div>

                    </div>

                    <div class="table-responsive">

                        <table class="table text-center align-middle">

                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Usuario</th>
                                    <th>Cuenta</th>
                                    <th>Monto</th>
                                    <th>Fecha</th>
                                </tr>
                            </thead>

                            <tbody id="tablaDetalleTransferencias">
                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>