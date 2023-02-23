import express from "express";
import rutasUsuarios from "./routes/userRoutes.js";
const app = express();

//Configuraciones
app.use(express.json())

//Rutas
app.use("/api/usuarios", rutasUsuarios)


app.listen("4000", ()=>{
    console.log("Servidor Ready !")
})