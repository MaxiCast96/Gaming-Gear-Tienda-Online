import express from "express";
import empleadoController from "../controllers/employeesController.js";

const router = express.Router();

router
  .route("/")
  .get(empleadoController.getEmpleados)
  .post(empleadoController.createEmpleado);

router
  .route("/:id")
  .put(empleadoController.updateEmpleado)
  .delete(empleadoController.deleteEmpleado);

export default router;
