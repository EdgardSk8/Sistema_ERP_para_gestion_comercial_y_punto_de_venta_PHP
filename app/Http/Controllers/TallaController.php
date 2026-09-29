<?php

namespace App\Http\Controllers;

use App\Models\Talla;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TallaController extends Controller
{
    public function CrearTalla(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'talla' => 'required|string|max:20|unique:tallas,talla',
            'estado_talla' => 'nullable|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errores' => $validator->errors()
            ], 422);
        }

        $talla = Talla::create([
            'talla' => $request->talla,
            'estado_talla' => $request->estado_talla ?? true,
        ]);

        return response()->json([
            'success' => true,
            'mensaje' => 'Talla creada correctamente.',
            'talla' => $talla
        ]);
    }

    public function EditarTalla($id)
    {
        $talla = Talla::find($id);

        if (!$talla) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Talla no encontrada.'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'talla' => $talla
        ]);
    }

    public function ActualizarTalla(Request $request, $id)
    {
        $talla = Talla::find($id);

        if (!$talla) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Talla no encontrada.'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'talla' => 'required|string|max:20|unique:tallas,talla,' . $id . ',id_talla',
            'estado_talla' => 'required|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errores' => $validator->errors()
            ], 422);
        }

        $talla->update([
            'talla' => $request->talla,
            'estado_talla' => $request->estado_talla,
        ]);

        return response()->json([
            'success' => true,
            'mensaje' => 'Talla actualizada correctamente.',
            'talla' => $talla
        ]);
    }

    public function CambiarEstadoTalla($id)
    {
        $talla = Talla::find($id);

        if (!$talla) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Talla no encontrada.'
            ], 404);
        }

        $talla->estado_talla = !$talla->estado_talla;
        $talla->save();

        return response()->json([
            'success' => true,
            'mensaje' => 'Estado de la talla actualizado correctamente.',
            'estado_talla' => $talla->estado_talla
        ]);
    }

    public function MostrarTalla()
    {
        $tallas = Talla::orderBy('talla')->get();

        return response()->json([
            'success' => true,
            'tallas' => $tallas
        ]);
    }

    public function EliminarTalla($id)
    {
        $talla = Talla::find($id);

        if (!$talla) {
            return response()->json([
                'success' => false,
                'mensaje' => 'Talla no encontrada.'
            ], 404);
        }

        $talla->delete();

        return response()->json([
            'success' => true,
            'mensaje' => 'Talla eliminada correctamente.'
        ]);
    }
}