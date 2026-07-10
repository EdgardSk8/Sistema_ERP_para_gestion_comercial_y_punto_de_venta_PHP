<div class="modal fade" id="modalCrearUsuario" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Crear Usuario</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearUsuario" class="row g-3">

                        <div class="col-12">
                            <label class="form-label">Nombre Completo</label>
                            <input
                                id="crear_nombre_completo_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre Completo Real"
                                pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cédula</label>
                            <input
                                id="crear_cedula_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="000-000000-0000A"
                                maxlength="16">
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Nombre de Usuario</label>
                            <input
                                id="crear_nombre_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Usuario Login"
                                autocomplete="username"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Rol</label>
                            <select
                                id="crear_rol_usuario"
                                class="form-select form-select-sm">
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Contraseña</label>
                            <input
                                id="crear_password_usuario"
                                type="password"
                                class="form-control form-control-sm"
                                placeholder="Mínimo 6 caracteres"
                                autocomplete="new-password"
                                minlength="6"
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
                    id="btnGuardarUsuario"
                    type="button"
                    class="btn guardar">
                    Guardar
                </button>

            </div>

        </div>

    </div>

</div>