import express from "express";
import rutasUsuario from "./rutas/usuarioRutas.js";
import rutasMascotas from "./rutas/mascotasRutas.js"
import dotenv from "dotenv"
dotenv.config();

const app = express()

//Configuracion JSON
app.use(express.json());


app.get("/",(req,res)=>{
    
    res.send("Servidor API Veterinaria");
})

//Rutas de la API
app.use("/api/usuarios",rutasUsuario)
app.use("/api/mascotas",rutasMascotas)


app.listen(8080,()=>{
    console.log("Servidor Activo !")
})