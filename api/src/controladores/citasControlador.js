import { z, ZodError } from "zod";
import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";

const citaModelo = z.object({
  motivo: z.string(),
  idMascota: z.number(),
});
const detallesCitaModel = z.object({
  idVeterinario: z.number().min(1),
  fecha: z.date().default(new Date()),
});

const prisma = new PrismaClient();

//Usuario/Dueño
const solicitarCita = async (req, res) => {
  try {
    //Mascotas del usuario
    const mascotasUsuarios = await prisma.mascota.findMany({
      where: { id_dueno: req.usuario.id },
    });
    const citaValidada = citaModelo.parse(req.body);

    //Verificar si esa mascota existe
    if (
      !mascotasUsuarios.some((mascota) => mascota.id == citaValidada.idMascota)
    ) {
      return res.status(400).json({
        message: "La mascota no es valida",
      });
    }

    //Poner el estado como pendiente
    citaValidada.estado = "pendiente";
    //Agregar quien solicito la cita
    citaValidada.idDueno = req.usuario.id;

    //Guardar la solicitud de cita en la base de datos
    const solicitudCita = await prisma.cita.create({
      data: citaValidada,
    });

    return res.status(200).json(solicitudCita);
  } catch (error) {
    //Si la validacion de Zod tuvo errores
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }

    console.log(error);
    return res.status(400).json(error);
  }
};
const confirmarCita = async (req, res) => {
  try {
    const { id } = req.params

    const isUpdated = await prisma.cita.updateMany({
      data: {
        estado: 'activo'
      },
      where: {
        AND: [
          {
            id: parseInt(id),
          },
          {
            idDueno: req.usuario.id
          },
          {
            estado: 'esperandoConfirmacion'
          }
        ]
      }
    })

    if (!isUpdated.count) {
      return res.status(200).json({
        message: "Esa cita no se ha encontrado o ya esta confirmada"
      })
    }

    const citaConfirmada = await prisma.cita.findFirst({ where: { id: parseInt(id) } })

    return res.status(200).json(citaConfirmada);

  } catch (error) {
    console.log(error);
    return res.status(200).json(error);
  }
}
const obtenerCitasUsuarios = async (req, res) => {
  try {
    const usuarioID = req.usuario.id;

    const citas = await prisma.cita.findMany({
      where: {
        idDueno: usuarioID
      },
      include: {
        diagnostico: true,
        mascota: true,
        pago: true,
        veterinario: true
      }
    })

    return res.status(200).json(citas)
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Hubo un error con la obtencion de citas"
    })
  }
}


//Secretario
const obtenerCitasPendientes = async (req, res) => {
  try {
    const citasPendientes = await prisma.cita.findMany({
      where: {
        estado: "pendiente",
      },
    });

    return res.status(200).json(citasPendientes);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Hubo un error",
    });
  }
};
const aceptarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const detallesCita = detallesCitaModel.parse(req.body);

    const existeVeterinario = await prisma.veterinario.findFirst({ where: { id: detallesCita.idVeterinario } })

    if (!existeVeterinario) {
      return res.status(400).json({
        message: "El veterinario no existe"
      })
    }

    const citaActivada = await prisma.cita.update({
      data: {
        estado: "activo",
        idSecretaria: req.usuario.id,
        ...detallesCita
      },
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json(citaActivada);
  } catch (error) {
    //Si la validacion de Zod tuvo errores
    if (error instanceof ZodError) {
      return res.status(400).json(error.issues);
    }

    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: "La cita no existe o es invalida"
      });
    }

    console.log(error);
    return res.status(400).json(error);
  }
};



//Veterinarios
const obtenerCitasVeterinaria = async (req, res) => {
  try {
    const citas = await prisma.cita.findMany({
      where: {
        estado: "activo"
      },
      include: {
        mascota: true,
        dueno: true,
        secretaria: true,
        pago: true,
        diagnostico: true
      }
    })
    return res.status(200).json(citas);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}
const finalizarCita = async (req, res) => {
  try {
    const { id } = req.params;

    const citaFinalizada = await prisma.cita.update({
      data: {
        estado: 'pagoPendiente'
      },
      where: {
        id: parseInt(id)
      }
    })

    return res.status(200).json(citaFinalizada)

  } catch (error) {
    console.log(error);
    if (error instanceof PrismaClientKnownRequestError) {
      return res.status(400).json({
        message: "La cita no existe o es invalida"
      });
    }
    return res.status(400).json(error);
  }
}

export {
  solicitarCita,
  obtenerCitasPendientes,
  aceptarCita,
  confirmarCita,
  obtenerCitasUsuarios,
  obtenerCitasVeterinaria,
  finalizarCita
};
