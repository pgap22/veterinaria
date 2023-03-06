import { Router } from "express";
import {
  aceptarCita,
  obtenerCitasPendientes,
  solicitarCita,
  confirmarCita,
  obtenerCitasVeterinaria,
  finalizarCita,
  obtenerCita,
  obtenerCitas,
} from "../controladores/citasControlador.js";
import autentificacion from "../middleware/autentificacion.js";
import autentificacionSecretaria from "../middleware/autentificacionSecretaria.js";
import autentificacionVeterinario from "../middleware/autentificacionVeterinario.js";

const rutas = Router();

//Obtener citas pendientes como secretaria
rutas.get("/pendientes", autentificacionSecretaria, obtenerCitasPendientes);
//Aceptar citas como secretaria
rutas.put("/aceptar/:id", autentificacionSecretaria, aceptarCita);

//Veterinarios
rutas.get("/activos", autentificacionVeterinario, obtenerCitasVeterinaria);
rutas.get("/finalizar/:id", autentificacionVeterinario, finalizarCita);
rutas.get("/veterinario", autentificacionVeterinario,obtenerCitas);
rutas.get("/:id", autentificacionVeterinario, obtenerCita);

//Solicitar cita como usuario
rutas.post("/", autentificacion, solicitarCita);
//Obtener citas como usuario
rutas.get("/", autentificacion, obtenerCitas);

rutas.get("/usuario/:id", autentificacion, obtenerCita);
//Confirmar cita como usuario
rutas.get("/confirmar/:id", autentificacion, confirmarCita);
export default rutas;
