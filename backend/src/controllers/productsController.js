// Controladores para Producto
const productsController = {};
import Producto from "../models/Products.js";

productsController.getProductos = async (req, res) => {
  const productos = await Producto.find();
  res.json(productos);
};

productsController.createProducto = async (req, res) => {
  const { nombre, categoria, precio, cantidad, descripcion } = req.body;
  const nuevoProducto = new Producto({ nombre, categoria, precio, cantidad, descripcion });
  await nuevoProducto.save();
  res.json({ message: "Producto guardado" });
};

productsController.deleteProducto = async (req, res) => {
  const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
  if (!productoEliminado) {
    return res.status(404).json({ message: "Producto no encontrado" });
  }
  res.json({ message: "Producto eliminado" });
};

productsController.updateProducto = async (req, res) => {
  const { nombre, categoria, precio, cantidad, descripcion } = req.body;
  await Producto.findByIdAndUpdate(req.params.id, { nombre, categoria, precio, cantidad, descripcion }, { new: true });
  res.json({ message: "Producto actualizado" });
};

export default productsController;