import { Router } from "express";

import
{
    agregarDiagnostico,
    verDiagnostico,
    obtenerDiagnosticos,
    editarDiagnostico,
    eliminarDiagnostico
} from "../controladores/diagnosticoControlador.js"

import autentificacionVeterinario from "../middleware/autentificacionVeterinario.js"

const rutas = Router();


//Solo veterinario
rutas.route("/")
.get(autentificacionVeterinario, obtenerDiagnosticos)
.post(autentificacionVeterinario, agregarDiagnostico)

rutas.route("/:id")
.get(autentificacionVeterinario, verDiagnostico)
.put(autentificacionVeterinario, editarDiagnostico)
.delete(autentificacionVeterinario, eliminarDiagnostico)



export default rutas