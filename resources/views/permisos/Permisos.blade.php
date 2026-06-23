<turbo-frame id="contenido-dinamico">

    <link rel="stylesheet" href="{{ Vite::asset('resources/css/permisos/Permisos.css') }}">

    <div class="card shadow-sm border-0 padre-permisos">

        <div class="dropdown">
            
            <select id="selectRol" class="Selector-Rol">
                <option value="">Seleccione un rol</option>
            </select>
                
        </div>

        <div class="hijo-permisos">

        <div id="estadoSinRol" class="estado-sin-rol">
            <div class="icono">👤</div>
            <h2>Seleccione un rol</h2>
            <p>Para visualizar y gestionar los permisos, primero debe seleccionar un rol.</p>
        </div>

            <div id="contenedorPermisos">
                <!-- JS genera acordeones por módulo -->
            </div>

        </div>

    </div>

    <!-- Toast -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
        <div id="toastMensaje" class="toast text-bg-success border-0">
            <div class="d-flex">
                <div class="toast-body" id="toastTexto"></div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    </div>

</turbo-frame>