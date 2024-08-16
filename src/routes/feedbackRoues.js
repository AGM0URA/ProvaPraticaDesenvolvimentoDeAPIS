import { Router } from "express";

import {
    fazerFeedback,
    pegarTodosOsFeedback
} from "../controllers/feedbackControlles.js";

const router = Router();

router.post("/feedback", fazerFeedback);
router.get("/feedback",pegarTodosOsFeedback)

export default router;
