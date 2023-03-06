import { Router } from "express";
import { obtenerVeterinarios } from "../controladores/veterinarioControlador.js";
import autentificacionSecretaria from "../middleware/autentificacionSecretaria.js";

const router = Router();

router.get("/", autentificacionSecretaria, obtenerVeterinarios);

export default router;