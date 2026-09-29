<turbo-frame id="contenido-dinamico">

    @include('productosvariaciondetalles.CheckColumnasProductoVariacionDetalle')
    @include('productosvariaciondetalles.CrearVariacionImagen')
    @include('productosvariaciondetalles.EditarVariacionImagen')

    <div class="card">

        <div class="card-body">

            <div class="row g-3 mb-3">

                <div class="col-md-6">
                    <label class="form-label">Producto</label>
                    <input type="text" id="detalle_producto" class="form-control form-control-sm" readonly>
                </div>

                <div class="col-md-6">
                    <label class="form-label">Color</label>
                    <input type="text" id="detalle_color" class="form-control form-control-sm" readonly>
                </div>

            </div>

            <ul class="nav nav-tabs" id="tabsProductoVariacionDetalle" role="tablist">

                <li class="nav-item" role="presentation">
                    <button class="nav-link active"
                            id="tab-imagenes"
                            data-bs-toggle="tab"
                            data-bs-target="#contenido-imagenes"
                            type="button"
                            role="tab">
                        Imágenes
                    </button>
                </li>

                <li class="nav-item" role="presentation">
                    <button class="nav-link"
                            id="tab-tallas"
                            data-bs-toggle="tab"
                            data-bs-target="#contenido-tallas"
                            type="button"
                            role="tab">
                        Tallas
                    </button>
                </li>

            </ul>

            <div class="tab-content mt-3">

                <div class="tab-pane fade show active"
                    id="contenido-imagenes"
                    role="tabpanel">

                    <div class="table-responsive">

                        <table id="tablaVariacionImagenes" class="table table-bordered">

                            <thead>
                                <tr>
                                    <th>Imagen</th>
                                    <th>Orden</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody></tbody>

                        </table>

                    </div>

                </div>

                <div class="tab-pane fade"
                    id="contenido-tallas"
                    role="tabpanel">

                    <div class="table-responsive">

                        <table id="tablaVariacionTallas" class="table table-bordered">

                            <thead>
                                <tr>
                                    <th>Talla</th>
                                    <th>Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>

                            <tbody></tbody>

                        </table>

                    </div>

                </div>

            </div>

        </div>

    </div>

</turbo-frame>
