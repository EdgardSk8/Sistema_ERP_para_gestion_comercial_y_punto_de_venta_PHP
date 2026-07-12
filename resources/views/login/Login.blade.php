<!DOCTYPE html>
<html lang="es">
<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Login - Sistema POS</title>

    @include('principal.links')
    @vite(['resources/css/login/login.css'])

    <script src="{{ Vite::asset('resources/js/Login.js') }}"></script>
    <meta name="csrf-token" content="{{ csrf_token() }}">

</head>

<body class="bg-light">

    <!-- BACKGROUND DECORATIVO (opcional mantener tu CSS) -->
    <div class="position-fixed top-0 start-0 w-100 h-100 overflow-hidden" style="z-index:0;">
        <div class="bg-shape bg-1"></div>
        <div class="bg-shape bg-2"></div>
    </div>

    <!-- CENTRADO BOOTSTRAP -->
    <div class="container min-vh-100 d-flex justify-content-center align-items-center position-relative" style="z-index:1;">

        <div class="card shadow-lg border-0 rounded-4 p-4" style="width: 100%; max-width: 420px;">

            <!-- HEADER -->
            <div class="text-center">

                <img src="{{ asset('img/icono.png') }}"
                     class="login-logo"
                     alt="Logo">

                <h4 class="mb-0 fw-bold">Tellez S.A</h4>
                <small class="text-muted">Sistema POS</small>

            </div>

            <!-- FORM -->
            <form id="formLogin">

                @csrf

                <!-- Usuario -->
                <div class="mb-3">

                    <label class="form-label">Usuario</label>

                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-person"></i>
                        </span>

                        <input type="text"
                               name="nombre_usuario"
                               class="form-control"
                               placeholder="Usuario"
                               required>
                    </div>

                </div>

                <!-- Password -->
                <div class="mb-3">

                    <label class="form-label">Contraseña</label>

                    <div class="input-group">
                        <span class="input-group-text">
                            <i class="bi bi-lock"></i>
                        </span>

                        <input type="password"
                               name="password"
                               class="form-control"
                               placeholder="Contraseña"
                               required>
                    </div>

                </div>

                <!-- BOTÓN -->
                <button type="submit"
                        class="btn btn-success w-100 d-flex align-items-center justify-content-center gap-2">

                    <i class="bi bi-box-arrow-in-right"></i>
                    Ingresar

                </button>

            </form>

            <!-- FOOTER -->
            <div class="text-center mt-3 small text-muted">
                © {{ date('Y') }} Tellez S.A
            </div>

        </div>

    </div>


    <div class="toast-container position-fixed top-0 end-0">

        <div id="toastMensaje" class="toast toast-custom fade" role="alert">

            <div class="toast-content">

                <div class="toast-icon" id="toastIcon"></div>

                <div class="toast-divider"></div>

                <div class="toast-text">

                    <div class="toast-title" id="toastTitulo"></div>

                    <div class="toast-message" id="toastTexto"></div>

                </div>

                <button type="button"
                        class="btn-close"
                        data-bs-dismiss="toast">
                </button>

            </div>

        </div>

    </div>


</body>
</html>