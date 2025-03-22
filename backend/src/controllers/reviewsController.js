const reviewsController = {};
import Resena from "../models/Reviews.js";

// SELECT
reviewsController.getResenas = async (req, res) => {
  const resenas = await Resena.find();
  res.json(resenas);
};

// INSERT
reviewsController.createResena = async (req, res) => {
  const { producto, comentarios } = req.body;
  const nuevaResena = new Resena({ producto, comentarios });
  await nuevaResena.save();
  res.json({ message: "Reseña guardada" });
};

// DELETE
reviewsController.deleteResena = async (req, res) => {
  const resenaEliminada = await Resena.findByIdAndDelete(req.params.id);
  if (!resenaEliminada) {
    return res.status(404).json({ message: "Reseña no encontrada" });
  }
  res.json({ message: "Reseña eliminada" });
};

// UPDATE
reviewsController.updateResena = async (req, res) => {
  const { producto, comentarios } = req.body;
  await Resena.findByIdAndUpdate(req.params.id, { producto, comentarios }, { new: true });
  res.json({ message: "Reseña actualizada" });
};

export default reviewsController;