<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Venta;
use App\Models\MovimientoInventario;
use Carbon\Carbon;
use App\Models\Producto;
use App\Models\DetalleVenta;

class DashboardController extends Controller
{
    public function ventas(Request $request)
    {
        $tipo = $request->get('tipo', 'dia');

        $inicio = $request->inicio;
        $fin = $request->fin;

        $query = Venta::query()->where('estado_venta', 1);

        // FILTROS

        // rango fechas
        if ($inicio && $fin) {

            $query->whereBetween('fecha_venta', [
                $inicio . ' 00:00:00',
                $fin . ' 23:59:59'
            ]);
        }

        // GRÁFICA PRINCIPAL

        switch ($tipo) {

            // FILTRO DIA
            case 'dia':

               $ventas = (clone $query)
                    ->selectRaw('DAYOFWEEK(fecha_venta) as orden')
                    ->selectRaw('COUNT(*) as cantidad')
                    ->selectRaw('SUM(total_venta) as total')
                    ->groupBy('orden')
                    ->orderBy('orden')
                    ->get();

                $dias = [ 2 => 'Lunes', 3 => 'Martes', 4 => 'Miércoles', 5 => 'Jueves', 6 => 'Viernes', 7 => 'Sábado', 1 => 'Domingo', ];

                $grafica = collect();

                foreach ($dias as $orden => $nombre) { $venta = $ventas->firstWhere('orden', $orden);

                    $grafica->push([
                        'label' => $nombre,
                        'cantidad' => (int)($venta->cantidad ?? 0),
                        'total' => round((float)($venta->total ?? 0), 2)
                    ]);
                }


            break;

            // FILTRO MES
            case 'mes':

                $ventas = (clone $query)
                    ->selectRaw('MONTH(fecha_venta) as mes')
                    ->selectRaw('COUNT(*) as cantidad')
                    ->selectRaw('SUM(total_venta) as total')
                    ->groupBy('mes')
                    ->get()
                    ->keyBy('mes');

                $meses = [
                    1 => 'Enero',
                    2 => 'Febrero',
                    3 => 'Marzo',
                    4 => 'Abril',
                    5 => 'Mayo',
                    6 => 'Junio',
                    7 => 'Julio',
                    8 => 'Agosto',
                    9 => 'Septiembre',
                    10 => 'Octubre',
                    11 => 'Noviembre',
                    12 => 'Diciembre',
                ];

                $grafica = collect();

                foreach ($meses as $numero => $nombre) { $venta = $ventas->get($numero);

                    $grafica->push([
                        'label' => $nombre,
                        'cantidad' => $venta->cantidad ?? 0,
                        'total' => round((float)($venta->total ?? 0), 2),
                    ]);
                }

            break;

            // FILTRO ANIO
            case 'anio':

            $grafica = (clone $query)
                ->selectRaw('YEAR(fecha_venta) as label')
                ->selectRaw('COUNT(*) as cantidad')
                ->selectRaw('SUM(total_venta) as total')
                ->groupBy(DB::raw('YEAR(fecha_venta)'))
                ->orderBy('label')
                ->get();

            break;

            default: $grafica = collect(); break;
        }

        // RESPUESTA
        return response()->json([

            'grafica' => $grafica,

            'horas' => (clone $query)
                ->selectRaw('HOUR(fecha_venta) as hora')
                ->selectRaw('COUNT(*) as cantidad')
                ->selectRaw('SUM(total_venta) as total')
                ->groupBy('hora')
                ->orderBy('hora')
                ->get()
                ->map(function ($item) {
                    return [
                        'label' => sprintf('%02d:00', $item->hora),
                        'cantidad' => (int) $item->cantidad,
                        'total' => round((float) $item->total, 2),
                    ];
                }),

            'productos' => (clone $query)
            ->join('detalle_ventas', 'ventas.id_venta', '=', 'detalle_ventas.id_venta')
            ->join('productos', 'detalle_ventas.id_producto', '=', 'productos.id_producto')
            ->selectRaw('productos.nombre_producto as label')
            ->selectRaw('SUM(detalle_ventas.cantidad_venta) as cantidad')
            ->selectRaw('SUM(detalle_ventas.subtotal_detalle_venta) as total')
            ->groupBy('productos.id_producto', 'productos.nombre_producto')
            ->orderByDesc('cantidad')
            ->limit(5)
            ->get(),

            //KPIS
            'kpis' => [

                //TOTAL DE VENTAS
                'total_ventas' => [
                    'titulo' => 'Ventas Totales:',
                    'valor' => number_format((clone $query)->count(), 0, ',', '.'),
                    'tooltip' => 'Total de Ventas Registradas',
                ],

                // INGRESOS TOTALES
                'ingresos' => [
                    'titulo' => 'Ingresos',
                    'valor' => 'C$ ' . number_format(round((float) ((clone $query)->sum('total_venta') ?? 0), 2), 2, ',', '.'),
                    'tooltip' => 'Ingresos totales generados',
                ],

                // UNIDADES VENDIDAS
                'unidades_vendidas' => [
                    'titulo' => 'Unidades',
                    'valor' => number_format((clone $query)
                        ->join('detalle_ventas', 'ventas.id_venta', '=', 'detalle_ventas.id_venta')
                        ->sum('detalle_ventas.cantidad_venta'), 0, ',', '.'),
                    'tooltip' => 'Unidades vendidas en total',
                ],

                // PROMEDIO POR VENTA
                'promedio_venta' => [
                    'titulo' => 'Promedio',
                    'valor' => 'C$ ' . number_format(round((float) ((clone $query)->avg('total_venta') ?? 0), 2), 2, ',', '.'),
                    'tooltip' => 'Promedio por cada venta',
                ],

                // VENTA MÁXIMA
                'venta_maxima' => [
                    'titulo' => 'Venta Máxima',
                    'valor' => 'C$ ' . number_format(round((float) ((clone $query)->max('total_venta') ?? 0), 2), 2, ',', '.'),
                    'tooltip' => 'Venta máxima registrada',
                ],

                // TOTAL DE IMPUESTOS
                'impuestos' => [
                    'titulo' => 'Impuestos',
                    'valor' => 'C$ ' . number_format(round((float) ((clone $query)->sum('impuesto_venta') ?? 0), 2), 2, ',', '.'),
                    'tooltip' => 'Impuestos recaudados',
                ],

            ],

           

        ]);
    
    }




    

    public function ganancias(Request $request)
    {
        $tipo = $request->get('tipo', 'dia');

        $inicio = $request->inicio;
        $fin    = $request->fin;

        $anio = $request->anio;
        $mes  = $request->mes;
        $dia  = $request->dia;

        /* ════════════════
        QUERY BASE (SOLO FILTROS)
        ════════════════ */

        $baseQuery = Venta::query()
            ->where('estado_venta', 1);

        if ($inicio && $fin) {
            $baseQuery->whereBetween('fecha_venta', [
                $inicio . ' 00:00:00',
                $fin . ' 23:59:59'
            ]);
        }

        if ($anio) $baseQuery->whereYear('fecha_venta', $anio);
        if ($mes)  $baseQuery->whereMonth('fecha_venta', $mes);
        if ($dia)  $baseQuery->whereDay('fecha_venta', $dia);

        /* ════════════════
        QUERY CON JOINS (SOLO PARA GRÁFICA)
        ════════════════ */

        $query = (clone $baseQuery)
            ->leftJoin('detalle_ventas', 'ventas.id_venta', '=', 'detalle_ventas.id_venta')
            ->leftJoin('productos', 'detalle_ventas.id_producto', '=', 'productos.id_producto');

        /* ════════════════
        FÓRMULA GANANCIA
        ════════════════ */

        $gananciaSQL = " SUM( ( detalle_ventas.precio_unitario_venta - IFNULL(productos.precio_compra, 0) ) * detalle_ventas.cantidad_venta)";

        /* ════════════════
        GRÁFICA
        ════════════════ */

        switch ($tipo) {

            case 'dia':
                $grafica = (clone $query)
                    ->whereDate( 'fecha_venta', '>=', Carbon::now()->subDays(60))
                    ->selectRaw("DATE_FORMAT(fecha_venta, '%Y-%m-%d') as label")
                    ->selectRaw("$gananciaSQL as ganancia")
                    ->groupBy(DB::raw("DATE_FORMAT(fecha_venta, '%Y-%m-%d')"))
                    ->orderBy('label')
                    ->get();
                break;

            case 'mes':
                $grafica = (clone $query)
                    ->selectRaw("DATE_FORMAT(fecha_venta, '%Y-%m') as label")
                    ->selectRaw("$gananciaSQL as ganancia")
                    ->groupBy(DB::raw("DATE_FORMAT(fecha_venta, '%Y-%m')"))
                    ->orderBy('label')
                    ->get();
                break;

            case 'anio':
                $grafica = (clone $query)
                    ->selectRaw("YEAR(fecha_venta) as label")
                    ->selectRaw("$gananciaSQL as ganancia")
                    ->groupBy(DB::raw("YEAR(fecha_venta)"))
                    ->orderBy('label')
                    ->get();
                break;

            case 'hora':
                $grafica = (clone $query)
                    ->selectRaw("DATE_FORMAT(fecha_venta, '%H:00') as label")
                    ->selectRaw("$gananciaSQL as ganancia")
                    ->groupBy(DB::raw("DATE_FORMAT(fecha_venta, '%H:00')"))
                    ->orderBy('label')
                    ->get();
                break;

            default:
                $grafica = collect();
                break;
        }

        /* ════════════════
        KPIs (SIN DUPLICAR JOINS)
        ════════════════ */

        $gananciaTotal = (clone $query)
            ->selectRaw("$gananciaSQL as ganancia")
            ->value('ganancia');

        $totalUnidades = (clone $baseQuery)
            ->join('detalle_ventas', 'ventas.id_venta', '=', 'detalle_ventas.id_venta')
            ->sum('detalle_ventas.cantidad_venta');

        $ingresos = (clone $baseQuery)
            ->sum('total_venta');

        $ventasTotales = (clone $baseQuery)
            ->count('ventas.id_venta');

        $margenPorVenta = $ingresos > 0
            ? round(($gananciaTotal / $ingresos) * 100, 2)
            : 0;

        /* ════════════════
        RESPUESTA
        ════════════════ */

        return response()->json([

            'grafica' => $grafica,

            'kpis' => [

                // 💰 Ganancia total real
                'ganancia_total' => round($gananciaTotal ?? 0, 2),

                // 💵 Ingresos totales
                'ingresos' => round($ingresos ?? 0, 2),

                // 📦 Ganancia promedio por unidad
                'ganancia_por_unidad' => $totalUnidades > 0
                    ? round($gananciaTotal / $totalUnidades, 2)
                    : 0,

                // 📊 % de ganancia por venta (MARGEN REAL)
                'margen_por_venta' => $margenPorVenta,

                // 🧾 Total de ventas realizadas
                'ventas_totales' => $ventasTotales,
            ],
        ]);
    }

    public function Movimientoinventario(Request $request)
    {
        $tipo = $request->get('tipo', 'dia');

        $inicio = $request->inicio;
        $fin    = $request->fin;

        $anio = $request->anio;
        $mes  = $request->mes;
        $dia  = $request->dia;

        /* ═══════════════ BASE QUERY ═══════════════ */

        $baseQuery = MovimientoInventario::query();

        if ($inicio && $fin) {
            $baseQuery->whereBetween('fecha_movimiento', [
                $inicio . ' 00:00:00',
                $fin . ' 23:59:59'
            ]);
        }

        if ($anio) $baseQuery->whereYear('fecha_movimiento', $anio);
        if ($mes)  $baseQuery->whereMonth('fecha_movimiento', $mes);
        if ($dia)  $baseQuery->whereDay('fecha_movimiento', $dia);

        // if (!$inicio && !$fin && !$anio && !$mes && !$dia) {
        //     $baseQuery->where('fecha_movimiento', '>=', now()->subDays(30));
        // }

        /* ═══════════════ GRÁFICA PRINCIPAL ═══════════════ */

        switch ($tipo) {

            case 'dia':

                $grafica = (clone $baseQuery)
                    ->whereDate('fecha_movimiento', '>=', now()->subDays(99))
                    ->selectRaw("DATE_FORMAT(fecha_movimiento, '%Y-%m-%d') as label")
                    ->selectRaw("
                        SUM(CASE WHEN tipo_movimiento = 'ENTRADA' THEN cantidad_movimiento ELSE 0 END) as entradas,
                        SUM(CASE WHEN tipo_movimiento = 'SALIDA' THEN cantidad_movimiento ELSE 0 END) as salidas,
                        SUM(CASE WHEN tipo_movimiento = 'AJUSTE' THEN cantidad_movimiento ELSE 0 END) as ajustes
                    ")
                    ->groupBy(DB::raw("DATE_FORMAT(fecha_movimiento, '%Y-%m-%d')"))
                    ->orderBy('label')
                    ->get();

                break;

            case 'mes':

                $grafica = (clone $baseQuery)
                    ->selectRaw("DATE_FORMAT(fecha_movimiento, '%Y-%m') as label")
                    ->selectRaw("
                        SUM(CASE WHEN tipo_movimiento = 'ENTRADA' THEN cantidad_movimiento ELSE 0 END) as entradas,
                        SUM(CASE WHEN tipo_movimiento = 'SALIDA' THEN cantidad_movimiento ELSE 0 END) as salidas,
                        SUM(CASE WHEN tipo_movimiento = 'AJUSTE' THEN cantidad_movimiento ELSE 0 END) as ajustes
                    ")
                    ->groupBy(DB::raw("DATE_FORMAT(fecha_movimiento, '%Y-%m')"))
                    ->orderBy('label')
                    ->get();

                break;

            case 'anio':

                $grafica = (clone $baseQuery)
                    ->selectRaw('YEAR(fecha_movimiento) as label')
                    ->selectRaw("
                        SUM(CASE WHEN tipo_movimiento = 'ENTRADA' THEN cantidad_movimiento ELSE 0 END) as entradas,
                        SUM(CASE WHEN tipo_movimiento = 'SALIDA' THEN cantidad_movimiento ELSE 0 END) as salidas,
                        SUM(CASE WHEN tipo_movimiento = 'AJUSTE' THEN cantidad_movimiento ELSE 0 END) as ajustes
                    ")
                    ->groupBy(DB::raw('YEAR(fecha_movimiento)'))
                    ->orderBy('label')
                    ->get();

                break;

            default:

                $grafica = collect();
                break;
        }

        /* ═══════════════ KPIS (SIN CAMBIOS) ═══════════════ */

        $totalMovimientos = (clone $baseQuery)->count();

        $entradas = (clone $baseQuery)
            ->where('tipo_movimiento', 'ENTRADA')
            ->sum('cantidad_movimiento');

        $salidas = (clone $baseQuery)
            ->where('tipo_movimiento', 'SALIDA')
            ->sum('cantidad_movimiento');

        $ajustes = (clone $baseQuery)
            ->where('tipo_movimiento', 'AJUSTE')
            ->sum('cantidad_movimiento');

        $balance = ($entradas + $ajustes) - $salidas;

        $promedioMovimiento = $totalMovimientos > 0
            ? round(($entradas + $salidas + $ajustes) / $totalMovimientos, 2)
            : 0;

        /* ═══════════════ RESPUESTA ═══════════════ */

        return response()->json([
            'grafica' => $grafica,
            'kpis' => [
                'total_movimientos' => $totalMovimientos,
                'entradas' => $entradas,
                'salidas' => $salidas,
                'ajustes' => $ajustes,
                'balance' => $balance,
                'promedio_movimiento' => $promedioMovimiento,
            ],
        ]);
    }



}