<div class="modal fade" id="modalCrearProveedor" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Crear Proveedor</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearProveedor" class="row g-3">

                        <div class="col-12">
                            <label class="form-label">Nombre del Proveedor</label>
                            <input
                                id="crear_nombre_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del proveedor"
                                maxlength="150"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Tipo de Proveedor</label>
                            <select
                                id="tipo_ruc"
                                class="form-select form-select-sm">

                                <option value="" disabled selected>Seleccionar</option>
                                <!-- <option value="natural">Natural nacional (cédula)</option> -->
                                <option value="N">Natural sin cédula</option>
                                <option value="R">Extranjero residente</option>
                                <option value="E">Extranjero no residente</option>
                                <option value="J">Persona jurídica</option>

                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">RUC</label>
                            <input
                                id="crear_ruc_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Ingrese RUC"
                                maxlength="14"
                                disabled>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Teléfono</label>
                            <input
                                id="crear_telefono_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Teléfono"
                                maxlength="15">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Correo</label>
                            <input
                                id="crear_correo_proveedor"
                                type="email"
                                class="form-control form-control-sm"
                                placeholder="Correo electrónico"
                                maxlength="100">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Dirección</label>
                            <input
                                id="crear_direccion_proveedor"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Dirección del proveedor"
                                maxlength="200">
                        </div>

                    </form>

                </div>

            </div>

            <div class="modal-footer">

                <button class="btn cancelar btn-sm-modal" data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnGuardarProveedor"
                    type="button"
                    class="btn guardar btn-sm-modal">
                    Guardar
                </button>

            </div>

        </div>

    </div>

</div>