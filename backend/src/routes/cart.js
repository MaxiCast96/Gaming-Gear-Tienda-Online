import express from "express";
import carritoController from "../controllers/cartController.js";

const router = express.Router();

router
  .route("/")
  .get(carritoController.getCarritos)
  .post(carritoController.createCarrito);

router
  .route("/:id")
  .put(carritoController.updateCarrito)
  .delete(carritoController.deleteCarrito);

export default router;
