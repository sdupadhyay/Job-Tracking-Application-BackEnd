import { Router } from "express";

import { login, logout, register } from "../controllers/auth.js";
import { upload } from "../middlewares/multer.js";
import verifyJwt from "../middlewares/verifyJwt.js";
const router = Router();
router
	.route("/register")
	.post(upload.fields([{ name: "avatar", maxCount: 1 }]), register);
router.route("/login").post(login);
router.route("/logout").post(verifyJwt, logout);
export default router;
