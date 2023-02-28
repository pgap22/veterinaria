import { Router } from "express";
import { crearUsuario,buscarUsuarioPorCredenciales } from "../controladores/usuarioControlador.js";
const rutas = Router();



//Crear ruta de autentificacion --> Buscar al usuario por su credeciales y vamos a encriptar un json
rutas.post("/login",buscarUsuarioPorCredenciales)


//Crear Ruta de registro --> Crear un nuevo usuario en la bd
rutas.post("/",crearUsuario)

export default rutas