import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient()

const obtenerVeterinarios = async (req,res)=>{
    try{
        const veterinarios = await prisma.veterinario.findMany();
        return res.status(200).json(veterinarios);
    }catch(e){
        console.log(e)
        return res.status(400).json(e);
    }
}

export {
    obtenerVeterinarios
}