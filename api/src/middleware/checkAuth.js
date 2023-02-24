import jwt from "jsonwebtoken"
import prisma from "../prisma.js";

export const checkAuth = async (req,res,next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {

            const jwtToken = req.headers.authorization.split(" ")[1];
            token = jwt.verify(jwtToken, process.env.JWT_SECRET)


            const usuario = await prisma.user.findUnique({
                where:{
                    id: token.id
                }
            })
            
            req.usuario = usuario
            if (usuario) return next();

        } catch (error) {
            console.log(error)
            return res.status(404).json({
                msg: "hubo un error",
            });
        }
    }

    return res.status(400).json({
        status: "error",
        msg: "No estas autenticado !",
    });
};