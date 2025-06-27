import express from "express";
import resenaController from "../controllers/reviewsController.js";

const router = express.Router();

// Rutas para reseñas generales
router
  .route("/")
  .get(resenaController.getAllResenas)
  .post(resenaController.createResena);

// Rutas específicas para productos
router.get("/producto/:productoId", resenaController.getResenasByProducto);
router.get("/producto/:productoId/estadisticas", resenaController.getEstadisticasProducto);

// Rutas para operaciones individuales
router
  .route("/:id")
  .put(resenaController.updateResena)
  .delete(resenaController.deleteResena);
export default router;