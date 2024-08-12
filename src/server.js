import "dotenv/config";
import express from "express";

import conn from "./config/conn.js";

import "./models/PalestranteModel.js";

import PalestrantesRoutes from "./routes/PalestranteRouter.js";

const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use("/eventos", PalestrantesRoutes)

app.listen(PORT, ()=>{
    console.log("server on port 😎"+PORT)
})