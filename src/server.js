import "dotenv/config";
import express from "express";

import conn from "./config/conn.js";

import "./models/PalestranteModel.js";
import "./models/eventoModels.js"
import "./models/participantesModels.js"
import "./models/inscricaoModels.js"
import "./models/feedbackModels.js"

import PalestrantesRoutes from "./routes/palestrantesRoutes.js";
import EventosRoutes from "./routes/eventosroutes.js"
import Palestrantes from "./routes/participantesRoutes.js"
import Incricao from "./routes/inscricaoRoutes.js"
import Feedback from "./routes/feedbackRoues.js"

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/eventos", PalestrantesRoutes)
app.use("/eventos",EventosRoutes)
app.use("/eventos",Palestrantes)
app.use("/eventos",Incricao)
app.use("/eventos",Feedback)


app.listen(PORT, ()=>{
    console.log("server on port 😎 "+PORT)
})
