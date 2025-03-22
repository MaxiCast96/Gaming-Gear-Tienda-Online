import express from "express";
import clienteController from "../controllers/customerController.js";

const router = express.Router();

router
  .route("/")
  .get(clienteController.getClientes)
  .post(clienteController.createCliente);

router
  .route("/:id")
  .put(clienteController.updateCliente)
  .delete(clienteController.deleteCliente);

export default router;
