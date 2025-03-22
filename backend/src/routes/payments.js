import express from "express";
import pagoController from "../controllers/paymentsController.js";

const router = express.Router();

router
  .route("/")
  .get(pagoController.getPagos)
  .post(pagoController.createPago);

router
  .route("/:id")
  .put(pagoController.updatePago)
  .delete(pagoController.deletePago);

export default router;
