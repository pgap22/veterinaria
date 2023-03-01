import express from "express";
import rutasUsuario from "./rutas/usuarioRutas.js";
import rutasMascotas from "./rutas/mascotasRutas.js"
import rutasCitas from "./rutas/citasRutas.js"
import dotenv from "dotenv"
dotenv.config();

const app = express()

//Configuracion JSON
app.use(express.json());

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhc2RAYWR3LmNvbSIsImlhdCI6MTY3NzU1NDg2MH0.eOpIovWLfiWiCQ9ED4maY6X1uwg1KGAuWV5X2PZ7rnM
app.get("/",(req,res)=>{
    
    res.send("Servidor API Veterinaria");
})

//Rutas de la API
app.use("/api/usuarios",rutasUsuario)
app.use("/api/mascotas",rutasMascotas)
app.use("/api/citas", rutasCitas)


app.listen(8080,()=>{
    console.log("Servidor Activo !")
})