import express from "express";
import { registerController, loginController } from '../controllers/authController.js';
const router = express.Router();

router.route("/").post(loginController);

export default router;
