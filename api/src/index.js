import express from "express";
import rutasUsuarios from "./routes/userRoutes.js";
import cors from "cors"

const app = express();

//Configuraciones
app.use(express.json())
app.use(cors());

//Rutas
app.use("/api/usuarios", rutasUsuarios)


app.listen("4000", ()=>{
    console.log("Servidor Ready !")
})