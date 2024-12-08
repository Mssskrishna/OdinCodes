import { Router } from "express";
import { checkUser, userCreate } from "../controllers/user.controllers.js";

const router = Router();

/* POST register */
router.post("/register", userCreate);
router.post("/login", checkUser);

export default router;
