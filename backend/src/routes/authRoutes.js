import express from "express";
import { registerUser, loginUser, logutUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser)
router.post("/login", loginUser)
router.post("/logout", logutUser)


export default router;