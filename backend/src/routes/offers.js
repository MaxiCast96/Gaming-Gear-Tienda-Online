import express from "express";
import ofertaController from "../controllers/offersController.js";

const router = express.Router();

router
  .route("/")
  .get(ofertaController.getOfertas)
  .post(ofertaController.createOferta);

router
  .route("/:id")
  .put(ofertaController.updateOferta)
  .delete(ofertaController.deleteOferta);

export default router;
