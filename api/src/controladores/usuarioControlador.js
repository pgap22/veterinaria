import z, { ZodError } from "zod";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const usuarioModelo = z.object({
  email: z.string().email().min(1),
  nombre: z.string().min(1),
  password: z.string().min(1),
  telefono: z.string().min(1),
  direccion: z.string().min(1),
});
const credencialesModelo = z.object({
  email: z.string().email().min(1),
  password: z.string().min(1),
});

const prisma = new PrismaClient();

const crearUsuario = async (req, res) => {
  try {
    //Validando el req.body
    const usuarioValidado = usuarioModelo.parse(req.body);

    //Buscar si existe un usuario con ese email

    //usuarioValidado.email = "juan@juan.com"
    // SELECT * from dueno where email = "juan@juan.com"

    const usuarioMismoEmail = await prisma.dueno.findFirst({
      where: {
        email: usuarioValidado.email,
      },
    });

    if (usuarioMismoEmail) {
      return res.status(400).json({
        message: "Ya existe un usuario con ese email",
      });
    }

    //Crear usuario en la base de datos
    const usuarioCreado = await prisma.dueno.create({
      data: {
        ...usuarioValidado,
      },
    });

    return res.status(200).json(usuarioCreado);
  } catch (error) {
    //Es un error de una validacion
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }

    return res.status(400).json({
      message: "Hubo un error",
    });
  }
};

const buscarUsuarioPorCredenciales = async (req, res) => {
  try {
    //Validando credenciales
    const credenciales = credencialesModelo.parse(req.body);

    //Buscando usuario con las credenciales
    const usuarioEncontrado = await prisma.dueno.findFirst({
      where: {
        email: credenciales.email,
        password: credenciales.password,
      },
    });

    if (!usuarioEncontrado) {
      return res.status(400).json({
        message: "Usuario o contraseña no son los correctos",
      });
    }

    //Crear token encriptado
    const token = jwt.sign(
      {
        id: usuarioEncontrado.id,
      },
      process.env.JWT_SECRET
    );

    return res.status(200).json({
      ...usuarioEncontrado,
      token
    });
  } catch (error) {
    //Es un error de una validacion
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }

    return res.status(400).json({
      message: "Hubo un error",
    });
  }
};

export { crearUsuario, buscarUsuarioPorCredenciales };