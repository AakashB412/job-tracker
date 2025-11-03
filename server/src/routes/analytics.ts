import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { summary } from "../controllers/analyticsController.js";
const router = Router();
router.use(auth);
router.get("/summary", summary);
export default router;
