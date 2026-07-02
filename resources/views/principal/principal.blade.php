<!DOCTYPE html>
<html lang="es">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- <title>Sistema</title> -->

    @include('principal.links')

    @vite(['resources/css/app.css'])
    @vite(['resources/css/principal/principal.css'])

    @vite(['resources/js/logout.js'])
    @vite(['resources/js/FuncionesGlobales.js'])

    @vite(['resources/js/app.js'])

    <meta property="og:title" content="Sistema POS Tellez">
    <meta property="og:description" content="Sistema de ventas e inventario">
    <meta property="og:image" content="{{ asset('icono.jpeg') }}">
    <meta property="og:type" content="website">

    <link rel="icon" href="{{ asset('Favicon.ico') }}" type="image/png">

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/@phosphor-icons/web@2.0.3/src/regular/style.css">


</head>

<body>

<div class="d-flex">

    <!-- ╔════════════ SIDEBAR ════════════╗ -->

    <div class="sidebar">

   <div class="sidebar-title"> FLIX
            <!-- <i class="bi bi-shop"></i> -->
           
        </div>

        <div class="sidebar-menu">

            @if(in_array('vista_dashboard', session('permisos', [])))
                <a href="{{ route('dashboard') }}"
                    class="sidebar-link"
                    data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-chart-pie text-info"></i> 
                    Dashboard
                </a>
            @endif

            <hr>

            <!-- ╔════════════ VENTAS ════════════╗ -->

            <div class="sidebar-section">
                Ventas
            </div>

            @if(in_array('vista_facturacion', session('permisos', [])))
                <a href="{{ route('facturacion') }}"
                    class="sidebar-link"
                    data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-receipt text-success"></i>
                    Facturación
                </a>
            @endif

            @if(in_array('vista_ventas', session('permisos', [])))
                <a href="{{ route('ventas') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-clock-counter-clockwise text-primary"></i>
                    Ventas
                </a>
            @endif

            @if(in_array('vista_clientes', session('permisos', [])))
                <a href="{{ route('clientes') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-users text-danger"></i>
                    Clientes
                </a>
            @endif

            <hr>

            <!-- ╔════════════ COMPRAS ════════════╗ -->

            <div class="sidebar-section">
                Compras
            </div>

            @if(in_array('vista_crear_compras', session('permisos', [])))
                <a href="{{ route('crear.compras') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-shopping-cart text-success"></i>
                    Compras
                </a>
            @endif

            @if(in_array('vista_compras', session('permisos', [])))
                <a href="{{ route('compras') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-list-checks text-primary"></i>
                    Lista de Compras
                </a>
            @endif

            @if(in_array('vista_proveedores', session('permisos', [])))
                <a href="{{ route('proveedores') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-truck text-info"></i>
                    Proveedores
                </a>
            @endif

            <hr>

            <!-- ╔════════════ CAJA ════════════╗ -->

            <div class="sidebar-section">
                Caja
            </div>

            @if(in_array('vista_cajas', session('permisos', [])))
                <a href="{{ route('cajas') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-wallet text-success"></i>
                    Cajas
                </a>
            @endif

            @if(in_array('vista_movimientos_cajas', session('permisos', [])))
                <a href="{{ route('movimientos.cajas') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                   <i class="ph ph-money text-primary"></i>
                    Movimientos de Caja
                </a>
            @endif

            <hr>

            <!-- ╔════════════ CUENTAS ════════════╗ -->

            <div class="sidebar-section">
                Cuentas
            </div>

            @if(in_array('vista_cuentas', session('permisos', [])))
                <a href="{{ route('cuentas') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-bank text-success"></i>
                    Cuentas
                </a>
            @endif

            @if(in_array('vista_movimientos_cuentas', session('permisos', [])))
                <a href="{{ route('movimientos.cuentas') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-arrows-left-right text-primary"></i>
                    Movimientos de Cuenta
                </a>
            @endif

            <!-- ╔════════════ TRANSFERENCIAS ════════════╗ -->

            <div class="sidebar-section">
                Transferencias
            </div>

            @if(in_array('vista_transferenciacajacuenta', session('permisos', [])))
                <a href="{{ route('transferencia') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-swap text-warning"></i>
                    Caja → Cuenta
                </a>
            @endif

            <hr>

            <!-- ╔════════════ GASTOS ════════════╗ -->

            <div class="sidebar-section">
                Gastos
            </div>

            @if(in_array('vista_gastos', session('permisos', [])))
                <a href="{{ route('gastos') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-receipt text-danger"></i>
                    Gastos
                </a>
            @endif

            @if(in_array('vista_tipos_gasto', session('permisos', [])))
                <a href="{{ route('tipos.gasto') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                   <i class="ph ph-tag text-primary"></i>
                    Tipos de Gasto
                </a>
            @endif

            @if(in_array('vista_movimientos_gastos', session('permisos', [])))
                <a href="{{ route('movimientos.gastos') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                   <i class="ph ph-arrows-left-right text-primary"></i>
                    Movimiento Gastos
                </a>
            @endif

            <hr>

            <!-- ╔════════════ INVENTARIO ════════════╗ -->

            <div class="sidebar-section">
                Inventario
            </div>

            @if(in_array('vista_productos', session('permisos', [])))
                <a href="{{ route('productos') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-package text-primary"></i>
                    Productos
                </a>
            @endif

            @if(in_array('vista_categorias', session('permisos', [])))
                <a href="{{ route('categorias') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-tag text-warning"></i>
                    Categorías
                </a>
            @endif

            @if(in_array('vista_movimientos_inventario', session('permisos', [])))
                <a href="{{ route('movimientos.inventario') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                   <i class="ph ph-arrows-left-right text-success"></i>
                    Movimientos Inventario
                </a>
            @endif

            <hr>

            <!-- ╔════════════ ADMINISTRACIÓN ════════════╗ -->

            <div class="sidebar-section">
                Administración
            </div>

            @if(in_array('vista_usuarios', session('permisos', [])))
                <a href="{{ route('usuarios') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-users text-primary"></i>
                    Usuarios
                </a>
            @endif

            @if(in_array('vista_roles', session('permisos', [])))
                <a href="{{ route('roles') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-identification-badge text-success"></i>
                    Roles
                </a>
            @endif

            @if(in_array('vista_permisos', session('permisos', [])))
                <a href="{{ route('permisos') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-shield-check text-danger"></i>
                    Permisos
                </a>
            @endif

            <hr>

            <div class="sidebar-section">
                Reportes
            </div>

            @if(in_array('vista_reportes', session('permisos', [])))
                <a href="{{ route('reportes') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-chart-line text-success"></i>
                    Reportes
                </a>
            @endif

            <!-- ╔════════════ CONFIG ════════════╗ -->

            <div class="sidebar-section">
                Configuración
            </div>

            @if(in_array('vista_impuestos', session('permisos', [])))
                <a href="{{ route('impuestos') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-percent text-danger"></i>
                    Impuestos
                </a>
            @endif

            @if(in_array('vista_metodos_pago', session('permisos', [])))
                <a href="{{ route('metodos.pago') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-credit-card text-primary"></i>
                    Métodos de Pago
                </a>
            @endif

            @if(in_array('vista_metodos_pago_cuenta', session('permisos', [])))
                <a href="{{ route('metodos.pago.cuenta') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-link text-success"></i>
                    Método Pago Cuenta
                </a>
            @endif

            <hr>
            
            @if(in_array('vista_credenciales', session('permisos', [])))
                <a href="{{ route('credenciales') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-buildings text-success"></i>
                    Credenciales
                </a>
            @endif

            @if(in_array('vista_respaldo', session('permisos', [])))
                <a href="{{ route('respaldo') }}"
                class="sidebar-link"
                data-turbo-frame="contenido-dinamico">
                    <i class="ph ph-database text-primary"></i>
                    Respaldo
                </a>
            @endif

            <hr>
            
            <div class="modos">
                 <button id="theme-toggle" class="theme-toggle" title="Cambiar tema">
                    <i class="ph ph-moon"></i>
                </button>
                <p id="modos"></p>
            </div>

           

           

            <div style="margin-top: 50px"></div>

        </div>

    </div>

    <!-- ╔════════════ CONTENT ════════════╗ -->

    <div class="content">

        <div class="topbar">

            <div id="titulo"></div>

            <div id="perfil">

            @php
                if (
                    !session()->has('usuario') ||
                    empty(session('usuario.nombre')) ||
                    empty(session('usuario.rol'))
                ) {
                    header('Location: ' . route('login')); exit;
                }
            @endphp

                <strong>
                    {{ session('usuario')['nombre'] ?? 'Invitado' }}
                </strong>

                <small>
                    ({{ session('usuario')['rol'] ?? 'Sin rol' }})
                </small>

                <button id="btnLogout" class="btn-login">
                    Cerrar sesión
                    <!-- <i class="bi bi-box-arrow-right"></i> -->
                </button>

            </div>

        </div>

        <turbo-frame id="contenido-dinamico"></turbo-frame>

    </div>

</div>

<script>
const html = document.documentElement;
const btn = document.getElementById("theme-toggle");
const icon = btn.querySelector("i");
const texto = document.getElementById("modos");

function actualizarTema() {
    const dark = html.dataset.theme === "dark";

    icon.className = dark ? "ph ph-sun" : "ph ph-moon";
    texto.textContent = dark ? "Modo oscuro" : "Modo claro";
}

// Estado inicial
actualizarTema();

btn.addEventListener("click", () => {

    icon.style.transform = "rotate(180deg)";

    setTimeout(() => {

        html.dataset.theme =
            html.dataset.theme === "dark"
                ? "light"
                : "dark";

        actualizarTema();

        icon.style.transform = "";

    }, 120);

});
</script>
</body>
</html>