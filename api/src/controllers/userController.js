import z from "zod"
import jwt from "jsonwebtoken";
import prisma from "../prisma.js";

const UserSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
    direccion: z.string().min(1),
    telefono: z.string().min(1),
})


const registrarUsuarios = async (req,res)=> {
    //Obtener json del usuarios
    try {
        const newUser = {
            data: UserSchema.parse(req.body),
        }

        const createdUser = await prisma.user.create(newUser);

        return res.json(createdUser);
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
const autenticarUsuarios = async(req,res)=>{
    try {
        const {email,password} = req.body

        const isUser = await prisma.user.findFirst({
            where: {
                email,
                password
            }
        })
        
        const token = jwt.sign({id: isUser.id}, process.env.JWT_SECRET)

        return res.json({
            ...isUser,
            token
        });

    } catch (error) {
        return res.status(403).json({
            message: "No estas autenticado"
        })
    }
}

export {
    registrarUsuarios,
    autenticarUsuarios
}