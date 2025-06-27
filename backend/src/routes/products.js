import express from "express";
import productoController from "../controllers/productsController.js";

const router = express.Router();

router.get('/:id', productoController.getProducto);

router
  .route("/")
  .get(productoController.getProductos)
  .post(productoController.createProducto);

router
  .route("/:id")
  .put(productoController.updateProducto)
  .delete(productoController.deleteProducto);

export default router;
