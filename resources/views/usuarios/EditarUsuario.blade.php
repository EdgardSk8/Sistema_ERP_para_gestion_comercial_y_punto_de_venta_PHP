<div class="modal fade" id="modalEditarUsuario" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">
                <h5 class="modal-title">Editar Usuario</h5>
                <button class="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formEditarUsuario" class="row g-3">

                        <input type="hidden" id="editar_id_usuario">

                        <div class="col-12">
                            <label class="form-label">Nombre Completo</label>
                            <input
                                id="editar_nombre_completo_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                pattern="^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Cédula</label>
                            <input
                                id="editar_cedula_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="000-000000-0000A"
                                maxlength="16"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Nombre de Usuario</label>
                            <input
                                id="editar_nombre_usuario"
                                type="text"
                                class="form-control form-control-sm"
                                autocomplete="username"
                                required>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Rol</label>
                            <select
                                id="editar_rol_usuario"
                                class="form-select form-select-sm">
                            </select>
                        </div>

                        <div class="col-md-6">
                            <label class="form-label">Estado</label>
                            <select
                                id="editar_estado_usuario"
                                class="form-select form-select-sm">

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                        <div class="col-12">
                            <label class="form-label">Nueva Contraseña</label>
                            <input
                                id="editar_password_usuario"
                                type="password"
                                class="form-control form-control-sm"
                                placeholder="Opcional"
                                autocomplete="new-password"
                                minlength="6">
                        </div>

                        <div class="col-12">
                            <label class="form-label">Fecha de Creación</label>
                            <input
                                id="editar_fecha_creacion"
                                type="datetime-local"
                                class="form-control form-control-sm"
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
                    id="btnActualizarUsuario"
                    type="button"
                    class="btn actualizar">
                    Actualizar
                </button>

            </div>

        </div>

    </div>

</div>