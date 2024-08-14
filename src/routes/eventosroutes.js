import { Router } from "express";

import {
    criarOsEventos,
    pegarTodosOsEventos
} from "../controllers/eventoControlles.js";

const router = Router();

router.get("/agenda", pegarTodosOsEventos);
router.post("/criar",criarOsEventos );

export default router;
