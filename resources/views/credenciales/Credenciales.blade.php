<turbo-frame id="contenido-dinamico">

    <div class="container-fluid">

    <!-- ╔════════════ CARD ════════════╗ -->
    <!-- ╚══════════════════════════════╝ -->

        <div class="card shadow-sm">

            <div style="background-color: #111827" class="card-header d-flex justify-content-between align-items-center">
                <h6 class="mb-0"  style="color: #f4f6f9">
                    <i class="bi bi-building"></i> Configuración de la Empresa
                </h6>

                <button class="btn btn-primary btn-sm" id="btnEditar">
                    <i class="bi bi-pencil"></i> Editar
                </button>
            </div>

            <div class="card-body">

                <div class="row">

                    <div class="col-md-6 mb-2">
                        <strong>Nombre:</strong>
                        <div id="nombre_empresa">-</div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <strong>RUC:</strong>
                        <div id="ruc_empresa">-</div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <strong>Dirección:</strong>
                        <div id="direccion_empresa">-</div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <strong>Teléfono:</strong>
                        <div id="telefono_empresa">-</div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <strong>Correo:</strong>
                        <div id="correo_empresa">-</div>
                    </div>

                    <div class="col-md-6 mb-2">
                        <strong>Tasa de Cambio:</strong>
                        <div id="tipo_cambio">-</div>
                    </div>

                </div>

            </div>

        </div>
        
    </div>

    @include('credenciales.EditarCredenciales')

</turbo-frame>