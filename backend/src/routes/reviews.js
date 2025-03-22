import express from "express";
import resenaController from "../controllers/reviewsController.js";

const router = express.Router();

router
  .route("/")
  .get(resenaController.getResenas)
  .post(resenaController.createResena);

router
  .route("/:id")
  .put(resenaController.updateResena)
  .delete(resenaController.deleteResena);

export default router;
