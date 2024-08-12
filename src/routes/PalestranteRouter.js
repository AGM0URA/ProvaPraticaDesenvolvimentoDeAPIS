import { Router } from "express";

import {
  buscarPalestrantes,
  cadastrarPalestrante,
} from "../controllers/PalestranteController.js";

const router = Router();

router.get("/palestrantes", buscarPalestrantes);
router.post("/palestrantes", cadastrarPalestrante);

export default router;
