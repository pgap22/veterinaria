import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//usuarios
const pagarCita = async (req, res) => {
    try {
        const { id } = req.params
        

        const citaPagada = await prisma.cita.update({
            data: {
                estado: 'finalizada'
            },
            where: {
                id:parseInt(id)
            }
        })

        return res.status(200).json(citaPagada);

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Hubo un error",
        });
    }
}

export {
    pagarCita
}