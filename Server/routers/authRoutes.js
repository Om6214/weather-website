import { Router } from "express";
import { signup, login, verifyOtp ,getuser } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authmiddleware.js";

const router = Router();

router.post("/signup", signup);
router.post("/verifyotp",verifyOtp)
router.post("/login", login);
router.get("/user",authMiddleware,getuser)

export default router;
