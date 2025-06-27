import express from "express";
import pedidoController from "../controllers/ordersController.js";

const router = express.Router();

router
  .route("/")
  .get(pedidoController.getPedidos)
  .post(pedidoController.createPedido);

router
  .route("/:id")
  .get(pedidoController.getPedidoById)
  .put(pedidoController.updatePedido)
  .delete(pedidoController.deletePedido);

export default router;