import { Router } from "express";

import {
    cadastrarParticipantes
} from "../controllers/participantesControlles.js";

const router = Router();


router.post("/participantes/registrar",cadastrarParticipantes );

export default router;
