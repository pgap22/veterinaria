import { Router } from "express";
import {
  crearMascota,
  editarMascota,
  eliminarMascota,
  obtenerMascotas,
  obtenerMascota,
} from "../controladores/mascotasControlador.js";
import autentificacion from "../middleware/autentificacion.js";


const rutas = Router();

//Crear Mascota
rutas.post("/", autentificacion ,crearMascota);
//Leer Mascotas
rutas.get("/",autentificacion, obtenerMascotas);

//Obtener Mascota por ID
rutas.get("/:id", autentificacion,obtenerMascota )

//Editar Mascota
rutas.put("/:id",autentificacion ,editarMascota);
//Eliminar Mascota
rutas.delete("/:id",autentificacion, eliminarMascota);

export default rutas;
