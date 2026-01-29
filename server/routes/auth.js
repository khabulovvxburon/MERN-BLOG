import { Router } from "express";
import { register, Login, GetMe } from "../controllers/auth.js";
import { checkAuth } from "../utils/checkAuth.js";

const router = new Router()

// Register
// http://localhost:3002/auth/register
router.post("/register", register)

// Login
// http://localhost:3002/auth/login
router.post("/login", Login )

// Get Me
// http://localhost:3002/auth/me
router.get("/me", checkAuth, GetMe )


export default router