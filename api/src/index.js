import express from "express";
import rutasUsuario from "./rutas/usuarioRutas.js";
import rutasMascotas from "./rutas/mascotasRutas.js"
import rutasCitas from "./rutas/citasRutas.js"
import rutasDiagnostico from "./rutas/diagnosticoRutas.js";
import rutasPagos from "./rutas/pagoRutas.js";
import dotenv from "dotenv"
dotenv.config();

const app = express()

//Configuracion JSON
app.use(express.json());

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqdWFuQGp1YW4uY29tIiwiaWF0IjoxNjc3Nzg1NDQwfQ.bUIbfkcl3Qe1PsEERtJIxSGSHPDR8Rlop8vkt6QrRjk
app.get("/",(req,res)=>{
    
    res.send("Servidor API Veterinaria");
})

//Rutas de la API
app.use("/api/usuarios",rutasUsuario)
app.use("/api/mascotas",rutasMascotas)
app.use("/api/citas", rutasCitas)
app.use("/api/diagnosticos", rutasDiagnostico);
app.use("/api/pagos", rutasPagos)


app.listen(8080,()=>{
    console.log("Servidor Activo !")
})