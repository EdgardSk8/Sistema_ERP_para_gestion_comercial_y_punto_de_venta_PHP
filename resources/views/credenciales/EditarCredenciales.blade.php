<div class="modal fade" id="modalEditarEmpresa" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Editar Configuración de la Empresa</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarEmpresa" class="row g-3">

                        <input type="hidden" id="editar_id_empresa">

                        <div class="col-md-6">
                            <label class="form-label">Nombre</label>
                            <input
                                type="text"
                                id="editar_nombre_empresa"
                                class="form-control form-control-sm"
                                placeholder="Nombre de la empresa"
                                maxlength="150"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">RUC</label>
                            <input
                                type="text"
                                id="editar_ruc_empresa"
                                class="form-control form-control-sm"
                                placeholder="Número RUC"
                                maxlength="20">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Dirección</label>
                            <input
                                type="text"
                                id="editar_direccion_empresa"
                                class="form-control form-control-sm"
                                placeholder="Dirección de la empresa"
                                maxlength="200">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input
                                type="text"
                                id="editar_telefono_empresa"
                                class="form-control form-control-sm"
                                placeholder="Teléfono de la empresa"
                                maxlength="20">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Correo</label>
                            <input
                                type="email"
                                id="editar_correo_empresa"
                                class="form-control form-control-sm"
                                placeholder="Correo Ej: empresa@gmail.com"
                                maxlength="100">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Tasa de Cambio</label>
                            <input
                                type="number"
                                id="editar_tipo_cambio"
                                class="form-control form-control-sm"
                                placeholder="36.50"
                                step="0.50"
                                min="0">
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">
                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" class="btn actualizar btn-sm-modal" id="btnActualizarEmpresa">Actualizar</button>
            </div>

        </div>

    </div>

</div>