const cartController = {};
import Carrito from "../models/Cart.js";

// SELECT
cartController.getCarritos = async (req, res) => {
  const carritos = await Carrito.find();
  res.json(carritos);
};

// INSERT
cartController.createCarrito = async (req, res) => {
  const { productos, cliente, total } = req.body;
  const nuevoCarrito = new Carrito({ productos, cliente, total });
  await nuevoCarrito.save();
  res.json({ message: "Carrito guardado" });
};

// DELETE
cartController.deleteCarrito = async (req, res) => {
  const carritoEliminado = await Carrito.findByIdAndDelete(req.params.id);
  if (!carritoEliminado) {
    return res.status(404).json({ message: "Carrito no encontrado" });
  }
  res.json({ message: "Carrito eliminado" });
};

// UPDATE
cartController.updateCarrito = async (req, res) => {
  const { productos, cliente, total } = req.body;
  await Carrito.findByIdAndUpdate(req.params.id, { productos, cliente, total }, { new: true });
  res.json({ message: "Carrito actualizado" });
};

export default cartController;