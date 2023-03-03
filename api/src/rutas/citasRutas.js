import { Router } from "express";
import {aceptarCita, obtenerCitasPendientes, solicitarCita,confirmarCita, obtenerCitasUsuarios, obtenerCitasVeterinaria, finalizarCita } from "../controladores/citasControlador.js";
import autentificacion from "../middleware/autentificacion.js";
import autentificacionSecretaria from "../middleware/autentificacionSecretaria.js";
import autentificacionVeterinario from "../middleware/autentificacionVeterinario.js";

const rutas = Router()


//Solicitar cita como usuario
rutas.post("/",autentificacion,solicitarCita);
//Obtener citas como usuario
rutas.get("/", autentificacion, obtenerCitasUsuarios)
//Confirmar cita como usuario
rutas.get("/confirmar/:id",autentificacion,confirmarCita)


//Obtener citas pendientes como secretaria
rutas.get("/pendientes",autentificacionSecretaria,obtenerCitasPendientes)
//Aceptar citas como secretaria
rutas.put("/aceptar/:id",autentificacionSecretaria,aceptarCita);


//Veterinarios
rutas.get("/activos",autentificacionVeterinario, obtenerCitasVeterinaria);
rutas.get("/finalizar/:id",autentificacionVeterinario,finalizarCita)
export default rutas