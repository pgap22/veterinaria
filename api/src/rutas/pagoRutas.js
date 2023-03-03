import { Router } from "express";
import { pagarCita } from "../controladores/pagoControlador.js";
import autentificacion from "../middleware/autentificacion.js";

const rutas = Router();

rutas.get("/pagar/:id",autentificacion,pagarCita);

export default rutas