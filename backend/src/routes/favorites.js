import express from "express";
import favoritoController from "../controllers/favoritesController.js";

const router = express.Router();

router
  .route("/")
  .get(favoritoController.getFavoritos)
  .post(favoritoController.createFavorito);

router
  .route("/:id")
  .put(favoritoController.updateFavorito)
  .delete(favoritoController.deleteFavorito);

export default router;
