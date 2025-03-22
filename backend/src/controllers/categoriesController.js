const categoriesController = {};
import Categoria from "../models/Categories.js";

categoriesController.getCategorias = async (req, res) => {
  const categorias = await Categoria.find();
  res.json(categorias);
};

categoriesController.createCategoria = async (req, res) => {
  const { nombre, descripcion, marcaAsociada } = req.body;
  const nuevaCategoria = new Categoria({ nombre, descripcion, marcaAsociada });
  await nuevaCategoria.save();
  res.json({ message: "Categoría guardada" });
};

categoriesController.deleteCategoria = async (req, res) => {
  const categoriaEliminada = await Categoria.findByIdAndDelete(req.params.id);
  if (!categoriaEliminada) {
    return res.status(404).json({ message: "Categoría no encontrada" });
  }
  res.json({ message: "Categoría eliminada" });
};

categoriesController.updateCategoria = async (req, res) => {
  const { nombre, descripcion, marcaAsociada } = req.body;
  await Categoria.findByIdAndUpdate(req.params.id, { nombre, descripcion, marcaAsociada }, { new: true });
  res.json({ message: "Categoría actualizada" });
};

export default categoriesController;