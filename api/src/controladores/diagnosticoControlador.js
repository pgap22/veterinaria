import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library.js";
import { z, ZodError } from "zod"

const diagnosticoModelo = z.object({
    fecha: z.date().default(new Date()),
    descripcion: z.string().min(1),
    recomendaciones: z.string().min(1),
    idCita: z.number().min(1)
})
const diagnosticoModeloUpdate = z.object({
    fecha: z.date().default(new Date()).optional(),
    descripcion: z.string().min(1).optional(),
    recomendaciones: z.string().min(1).optional(),
})

const prisma = new PrismaClient()

const agregarDiagnostico = async (req, res) => {
    try {
        const diagnosticoValidado = diagnosticoModelo.parse(req.body);

        //Añadir el veterinario que hizo los diagnosticos
        diagnosticoValidado.idVeterinario = req.usuario.id

        //Detectar si la cita existe
        const existeCita = await prisma.cita.findFirst({where: {id: diagnosticoValidado.idCita}})
        
        if(!existeCita){
            return res.status(404).json({
                message: "La cita no ha sido encontrada o es invalida"
            })
        }

        const diagnosticoAgregado = await prisma.diagnostico.create({
            data: diagnosticoValidado
        })

        return res.status(201).json(diagnosticoAgregado);

    } catch (error) {
        //Si la validacion de Zod tuvo errores
        if (error instanceof ZodError) {
            return res.status(400).json(error.issues);
        }

        console.log(error);
        return res.status(400).json(error);
    }
}
const verDiagnostico = async (req, res) => {
    try {
        const {id} = req.params;
        
        const diagnostico = await prisma.diagnostico.findFirst({
            where:{
                id
            }
        })
        
        if(!diagnostico){
            return res.status(404).json({
                message: "El diagnostico no se ha encontrado"
            })
        }

        return res.status(200).json(diagnostico)
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const obtenerDiagnosticos = async (req, res) => {
    try {
        const usuarioID = req.usuario.id
        const diagnosticos = await prisma.diagnostico.findMany({
            where:{
                idVeterinario: usuarioID
            }
        })
        return res.status(200).json(diagnosticos);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
}
const editarDiagnostico = async (req, res) => {
    try {
        const {id} = req.params
        
        const diagnosticoValidado = diagnosticoModeloUpdate.parse(req.body)

        const diagnosticoCreado = await prisma.diagnostico.update({
            data: diagnosticoValidado,
            where:{
                id
            }
        })

        return res.status(200).json(diagnosticoCreado);

    } catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json(error.issues);
        }

        console.log(error);
        return res.status(400).json(error);
    }
}
const eliminarDiagnostico = async (req, res) => {
    try {
        const {id} = req.params;
        await prisma.diagnostico.delete({
            where: {
                id
            }
        })
        return res.status(200).json({
            message: "Diagnostico eliminado !"
        })
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
}

export {
    agregarDiagnostico,
    verDiagnostico,
    obtenerDiagnosticos,
    editarDiagnostico,
    eliminarDiagnostico
}