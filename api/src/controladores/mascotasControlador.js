import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { z, ZodError } from "zod";

const mascotaModel = z.object({
  nombre: z.string().min(1),
  especie: z.string().min(1),
  raza: z.string().min(1),
  genero: z.boolean(),
  edad: z.string().min(1),
});
const mascotaModelUpdate = z.object({
  nombre: z.string().min(1).optional(),
  especie: z.string().min(1).optional(),
  raza: z.string().min(1).optional(),
  genero: z.boolean().optional(),
  edad: z.string().min(1).optional(),
});

const prisma = new PrismaClient();

const crearMascota = async (req, res) => {
  //Validando json de req.body  -> json de la mascota
  try {
    const mascota = mascotaModel.parse(req.body);

    //El usuario se trajo atraves de la funcion intermendiaria linea 31
    mascota.id_dueno = req.usuario.id;

    const mascotaCreada = await prisma.mascota.create({
      data: {
        ...mascota,
      },
    });

    return res.status(201).json(mascotaCreada);
  } catch (error) {
    //Si la validacion de Zod tuvo errores
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }

    console.log(error);
    return res.status(400).json({
      message: "Hubo un error en la creacion de la mascota",
    });
  }
};
const obtenerMascotas = async (req, res) => {
  try {
    //Ya se tiene el id del usuario por el middleware de autentificacion
    const mascotasUsuarios = await prisma.mascota.findMany({
      where: {
        id_dueno: req.usuario.id,
      },
    });

    return res.status(200).json(mascotasUsuarios);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Hubo un error al obtener las mascotas",
    });
  }
};
const obtenerMascota = async (req, res) => {
  try {
    //Id de los params de express
    const { id } = req.params;
    const mascota = await prisma.mascota.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    //Si no existe esas mascota
    if (!mascota) {
      return res.status(404).json({
        message: "Esa mascota no existe",
      });
    }

    return res.status(200).json(mascota);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Hubo un error" });
  }
};
const editarMascota = async (req, res) => {
  try {
    //Obtener el id de la mascota mediante los url params de express
    const { id } = req.params;

    const mascotaValidada = mascotaModelUpdate.parse(req.body);

    const mascotaActualizada = await prisma.mascota.update({
      data: mascotaValidada,

      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(mascotaActualizada);
  } catch (error) {
    console.log(error);
    //Si la validacion de Zod tuvo errores
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }
  }
};
const eliminarMascota = async (req, res) => {
  try {
    const { id } = req.params;
    const mascotaEliminada = await prisma.mascota.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      message: "La mascota ha sido eliminada !",
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(404).json({
        message: "La mascota no existe",
      });
    }

    console.log(error);
    return res.status(400).json({
      message: "Hubo un error",
    });
  }
};

export {
  crearMascota,
  editarMascota,
  eliminarMascota,
  obtenerMascotas,
  obtenerMascota,
};
