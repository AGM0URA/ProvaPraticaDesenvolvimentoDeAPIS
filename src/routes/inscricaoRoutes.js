import { Router } from "express";

import {
    fazerInscrao
} from "../controllers/inscricaoControllers.js";

const router = Router();

router.post("/inscrever",fazerInscrao );

export default router;
