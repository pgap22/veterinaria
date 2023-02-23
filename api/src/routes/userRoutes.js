import { Router } from "express";
import {
  autenticarUsuarios,
  registrarUsuarios,
} from "../controllers/userController.js";
const router = Router();

//Autenticar usuarios
router.post("/login", autenticarUsuarios);

//Registrar usuarios
router.post("/", registrarUsuarios);

export default router;
