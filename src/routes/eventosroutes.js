import { Router } from "express";

import {
  criarOsEventos,
  pegarTodosOsEventos,
  editarEvento,
  deletarEvento,
} from "../controllers/eventoControlles.js";

const router = Router();

router.get("/agenda", pegarTodosOsEventos);
router.post("/criar", criarOsEventos);
router.put("/:id", editarEvento);
router.delete("/:id", deletarEvento);
export default router;
