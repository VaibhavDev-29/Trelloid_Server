import { Router } from "express";
import healthcheck from "../controller/healthcheck.controller.js"
import { registerUser } from "../controller/auth.controller.js";

const router = Router()

router.post("/register", registerUser)

export default router