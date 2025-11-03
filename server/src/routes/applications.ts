import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createApplication, getApplication, listApplications, removeApplication, updateApplication } from "../controllers/applicationController.js";


const router = Router();
router.use(auth);
router.post("/", createApplication);
router.get("/", listApplications);
router.get("/:id", getApplication);
router.patch("/:id", updateApplication);
router.delete("/:id", removeApplication);
export default router;
