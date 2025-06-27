import express from "express";
import carritoController from "../controllers/cartController.js";

const router = express.Router();

router
  .route("/")
  .post(carritoController.createCarrito); // POST to add/update product in cart

router
  .route("/:id") // Use :id for cart ID for PUT/DELETE operations on the whole cart
  .put(carritoController.updateCarrito)
  .delete(carritoController.deleteCarrito);

router.get("/client/:clientId", carritoController.getCarritos); // New route to get cart by client ID

export default router;

// This line should be in your main app file (e.g., app.js or server.js)
// app.use("/api/cart", router);