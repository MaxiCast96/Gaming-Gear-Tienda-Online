const favoritesController = {};
import Favorito from "../models/Favorites.js";

// SELECT
favoritesController.getFavoritos = async (req, res) => {
  const favoritos = await Favorito.find();
  res.json(favoritos);
};

// INSERT
favoritesController.createFavorito = async (req, res) => {
  const { cliente, producto } = req.body;
  const nuevoFavorito = new Favorito({ cliente, producto });
  await nuevoFavorito.save();
  res.json({ message: "Favorito guardado" });
};

// DELETE
favoritesController.deleteFavorito = async (req, res) => {
  const favoritoEliminado = await Favorito.findByIdAndDelete(req.params.id);
  if (!favoritoEliminado) {
    return res.status(404).json({ message: "Favorito no encontrado" });
  }
  res.json({ message: "Favorito eliminado" });
};

// UPDATE
favoritesController.updateFavorito = async (req, res) => {
  const { cliente, producto } = req.body;
  await Favorito.findByIdAndUpdate(req.params.id, { cliente, producto }, { new: true });
  res.json({ message: "Favorito actualizado" });
};

export default favoritesController;
