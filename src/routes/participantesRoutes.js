import { Router } from "express";

import {
    cadastrarParticipantes,
    buscarParticipantes
} from "../controllers/participantesControlles.js";

const router = Router();


router.post("/participantes/registrar",cadastrarParticipantes );
router.get("/participantes",buscarParticipantes )

export default router;
