import { Router } from "express";
import {aceptarCita, obtenerCitasPendientes, solicitarCita,confirmarCita } from "../controladores/citasControlador.js";
import autentificacion from "../middleware/autentificacion.js";
import autentificacionSecretaria from "../middleware/autentificacionSecretaria.js";

const rutas = Router()

//Obtener citas pendientes como secretaria
rutas.get("/pendientes",autentificacionSecretaria,obtenerCitasPendientes)


//Aceptar citas como secretaria
rutas.patch("/aceptar/:id",autentificacionSecretaria,aceptarCita);

//Solicitar cita como usuario
rutas.post("/",autentificacion,solicitarCita);

//Confirmar cita como usuario
rutas.get("/confirmar/:id",autentificacion,confirmarCita)

export default rutas