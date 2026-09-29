<div class="modal fade" id="modalEditarProductoVariacion" tabindex="-1" aria-hidden="true">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <form id="formEditarProductoVariacion">

                @csrf

                <input
                    type="hidden"
                    id="editar_id_variacion"
                    name="id_variacion">

                <div class="modal-header">
                    <h5 class="modal-title">Editar Variación</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>

                <div class="modal-body">

                    <div class="row g-3">

                        <div class="col-12">
                            <label for="editar_id_producto" class="form-label">
                                Producto
                            </label>

                            <select
                                id="editar_id_producto"
                                name="id_producto"
                                class="form-select form-select-sm"
                                required>
                                <option value="">Seleccione un producto</option>
                            </select>
                        </div>

                        <div class="col-12">
                            <label for="editar_color" class="form-label">
                                Color
                            </label>

                            <input
                                type="text"
                                id="editar_color"
                                name="color"
                                class="form-control form-control-sm"
                                maxlength="100"
                                required>
                        </div>

                        <div class="col-12">
                            <label for="editar_estado_variacion" class="form-label">
                                Estado
                            </label>

                            <select
                                id="editar_estado_variacion"
                                name="estado_variacion"
                                class="form-select form-select-sm"
                                required>

                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>

                            </select>
                        </div>

                    </div>

                </div>

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn cancelar btn-sm-modal"
                        data-bs-dismiss="modal">
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        class="btn actualizar btn-sm-modal">
                        Actualizar
                    </button>

                </div>

            </form>

        </div>

    </div>

</div>