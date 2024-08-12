import "dotenv/config";
import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PORT = process.env.PORT;


//*importar conexçao
import conn from "./config/conn.js";

