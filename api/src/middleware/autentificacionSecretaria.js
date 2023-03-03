import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const autentificacionSecretaria = async (req, res, next) => {
  try {
    //Primer paso obtengo el token de autentificacion
    const autorizacion = req.headers.authorization;

    if (autorizacion && autorizacion.startsWith("Bearer")) {
      const token = autorizacion.split(" ")[1];

      const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);

      //Verifico si el usuario si exista
      const usuarioEncontradoPorId = await prisma.secretaria.findFirst({
        where: {
            id: tokenVerificado.id,
            email: tokenVerificado.email
        },
        // select: {
        //     email: true,
        //     id: true,
        //     direccion: true,
        //     telefono: true,
        //     nombre: true
        // },
      });

      if(usuarioEncontradoPorId){
        console.log(usuarioEncontradoPorId)
        req.usuario = usuarioEncontradoPorId
        //Borrar el atributo password (antes se usaba el select en prisma pero ahora prefiero usar este)
        delete req.usuario.password
        return next()
      }

      return res.status(400).json({
        message: "Hubo un error de autentificacion",
      });

    }

    //Si no entra en el if, no hay token de autentificacion
    return res.status(400).json({
      message: "No estas autentificado",
    });
  } catch (error) {
    console.log(error)
    return res.status(400).json({
      message: "Hubo un error de autentificacion",
    });
  }
};

export default autentificacionSecretaria;
