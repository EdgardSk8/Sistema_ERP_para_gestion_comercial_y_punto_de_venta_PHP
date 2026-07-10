<div class="modal fade" id="modalCrearImpuesto" tabindex="-1">

    <div class="modal-dialog modal-dialog-centered">

        <div class="modal-content">

            <div class="modal-header">

                <h5 class="modal-title">Crear Impuesto</h5>

                <button
                    class="btn-close"
                    data-bs-dismiss="modal">
                </button>

            </div>


            <div class="modal-body">

                <div class="card-responsive">

                    <form id="formCrearImpuesto" class="row g-3">


                        <div class="col-12">

                            <label class="form-label">
                                Nombre del Impuesto
                            </label>

                            <input
                                id="crear_nombre_impuesto"
                                type="text"
                                class="form-control form-control-sm"
                                placeholder="Nombre del impuesto"
                                maxlength="100"
                                required>

                        </div>


                        <div class="col-12">

                            <label class="form-label">
                                Porcentaje (%)
                            </label>

                            <input
                                id="crear_porcentaje_impuesto"
                                type="number"
                                class="form-control form-control-sm"
                                placeholder="Ejemplo: 15"
                                min="0"
                                max="100"
                                step="0.1"
                                required>

                        </div>


                    </form>

                </div>

            </div>


            <div class="modal-footer">

                <button
                    class="btn cancelar"
                    data-bs-dismiss="modal">
                    Cancelar
                </button>

                <button
                    id="btnGuardarImpuesto"
                    type="button"
                    class="btn guardar">
                    Guardar
                </button>

            </div>


        </div>

    </div>

</div>