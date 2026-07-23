<turbo-frame id="contenido-dinamico">

    <link rel="stylesheet" href="{{ Vite::asset('resources/css/credenciales/Credenciales.css') }}">

    <!-- ╔════════════ CARD ════════════╗ -->
    <!-- ╚══════════════════════════════╝ -->

    <div class="card h-auto">

        <div class="card-header d-flex justify-content-between align-items-center">
            <h6 class="mb-0">Configuración de la Empresa</h6>

            <button class="btn guardar btn-sm-modal" id="btnEditar">
                Editar
            </button>
        </div>

        <div class="card-body">

            <div class="card-responsive">

                <div class="row g-2">

                    <div class="col-md-6">
                        <strong>Nombre:</strong>
                        <span id="nombre_empresa"></span>
                    </div>

                    <div class="col-md-6">
                        <strong>RUC:</strong>
                        <span id="ruc_empresa"></span>
                    </div>

                    <div class="col-md-6">
                        <strong>Dirección:</strong>
                        <span id="direccion_empresa"></span>
                    </div>

                    <div class="col-md-6">
                        <strong>Teléfono:</strong>
                        <span id="telefono_empresa"></span>
                    </div>

                    <div class="col-md-6">
                        <strong>Correo:</strong>
                        <span id="correo_empresa"></span>
                    </div>

                    <div class="col-md-6">
                        <strong>Tasa de Cambio:</strong>
                        <span id="tipo_cambio"></span>
                    </div>

                </div>

            </div>

        </div>

    </div>
        

    @include('credenciales.EditarCredenciales')

</turbo-frame>