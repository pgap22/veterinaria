import express from "express";
import rutasUsuario from "./rutas/usuarioRutas.js";
import rutasMascotas from "./rutas/mascotasRutas.js"
import rutasCitas from "./rutas/citasRutas.js"
import rutasDiagnostico from "./rutas/diagnosticoRutas.js";
import rutasPagos from "./rutas/pagoRutas.js";
import rutasVeterinario from "./rutas/veterinariosRutas.js";
import dotenv from "dotenv"
import cors from 'cors'

dotenv.config();

const app = express()

//Configuracion JSON
app.use(express.json());
app.use(cors())

app.get("/",(req,res)=>{
    
    res.send("Servidor API Veterinaria");
})

//Rutas de la API
app.use("/api/usuarios",rutasUsuario)
app.use("/api/mascotas",rutasMascotas)
app.use("/api/citas", rutasCitas)
app.use("/api/diagnosticos", rutasDiagnostico);
app.use("/api/pagos", rutasPagos)
app.use("/api/veterinarios", rutasVeterinario);

app.listen(8080,()=>{
    console.log("Servidor Activo !")
})