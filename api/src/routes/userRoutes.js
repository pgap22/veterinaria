import { Router } from "express";
import {
  autenticarUsuarios,
  registrarUsuarios,
  obtenerPerfil,
} from "../controllers/userController.js";
import { checkAuth } from "../middleware/checkAuth.js";
const router = Router();

//Obtener perfil
router.get("/perfil", checkAuth, obtenerPerfil);

//Autenticar usuarios
router.post("/login", autenticarUsuarios);

//Registrar usuarios
router.post("/", registrarUsuarios);

export default router;
