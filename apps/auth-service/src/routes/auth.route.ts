import express, { Router } from "express";
import { GetUser, Login, RefreshToken, Register, Logout } from "../controllers/auth.controller";
import isAuthenticated from "@packages/middleware/isAuthenticated";

const router: Router = express.Router();

router.post("/login", Login);
router.post("/register", Register);
router.get("/logged-in-user", isAuthenticated, GetUser);
router.post("/refresh-token", RefreshToken);
router.post("/logout", Logout);

export default router;
