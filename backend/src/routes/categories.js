import express from "express";
import categoriaController from "../controllers/categoriesController.js";

const router = express.Router();

router
  .route("/")
  .get(categoriaController.getCategorias)
  .post(categoriaController.createCategoria);

router
  .route("/:id")
  .put(categoriaController.updateCategoria)
  .delete(categoriaController.deleteCategoria);

export default router;
