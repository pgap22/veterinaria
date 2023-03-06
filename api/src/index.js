import express from "express";
import rutasUsuario from "./rutas/usuarioRutas.js";
import rutasMascotas from "./rutas/mascotasRutas.js"
import rutasCitas from "./rutas/citasRutas.js"
import rutasDiagnostico from "./rutas/diagnosticoRutas.js";
import rutasPagos from "./rutas/pagoRutas.js";
import rutasVeterinario from "./rutas/veterinariosRutas.js";
import dotenv from "dotenv"
import cors from 'cors'
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express()

//Configuracion JSON
app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {

    res.send("Servidor API Veterinaria");
})

//Rutas de la API
app.use("/api/usuarios", rutasUsuario)
app.use("/api/mascotas", rutasMascotas)
app.use("/api/citas", rutasCitas)
app.use("/api/diagnosticos", rutasDiagnostico);
app.use("/api/pagos", rutasPagos)
app.use("/api/veterinarios", rutasVeterinario);


//Crear usuario de veterinaria si no hay

const prisma = new PrismaClient()

!async function ()  {
    try {
        const isSecretaria = await prisma.secretaria.findFirst({
            where: {
                email: "secretaria@pet.com"
            }
        })
        if (!isSecretaria) {
            
            console.log("Secretaria Creado !");
            await prisma.secretaria.create({
                data: {
                    nombre: "Juana",
                    email: "secretaria@pet.com",
                    password: "123"
                }
            })
        }

        const isVeterinario = await prisma.veterinario.findFirst({
            where: {
                email: "veterinario@pet.com"
            }
        })

        if (!isVeterinario) {
            console.log("Veterinario Creado !");
            await prisma.veterinario.create({
                data: {
                    nombre: "Pedro",
                    email: "veterinario@pet.com",
                    password: "123",
                    especialidad: "perros",
                    telefono: "5484884"
                }
            })
        }
    } catch (error) {
    }
}()
//5206030506837085
app.listen(8080, () => {
    console.log("Servidor Activo !")
})