const offersController = {};
import Oferta from "../models/Offers.js";

// SELECT
offersController.getOfertas = async (req, res) => {
  const ofertas = await Oferta.find();
  res.json(ofertas);
};

// INSERT
offersController.createOferta = async (req, res) => {
  const { producto, descuentoPorcentaje } = req.body;
  const nuevaOferta = new Oferta({ producto, descuentoPorcentaje });
  await nuevaOferta.save();
  res.json({ message: "Oferta guardada" });
};

// DELETE
offersController.deleteOferta = async (req, res) => {
  const ofertaEliminada = await Oferta.findByIdAndDelete(req.params.id);
  if (!ofertaEliminada) {
    return res.status(404).json({ message: "Oferta no encontrada" });
  }
  res.json({ message: "Oferta eliminada" });
};

// UPDATE
offersController.updateOferta = async (req, res) => {
  const { producto, descuentoPorcentaje } = req.body;
  await Oferta.findByIdAndUpdate(req.params.id, { producto, descuentoPorcentaje }, { new: true });
  res.json({ message: "Oferta actualizada" });
};

export default offersController;
