// backend/src/routes/userRoutes.ts
import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController";

const router = Router();

// Route: POST /api/users/register
router.post("/register", registerUser);

// Route: POST /api/users/login
router.post("/login", loginUser);

export default router;
