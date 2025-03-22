const paymentsController = {};
import Pago from "../models/Payments.js";

paymentsController.getPagos = async (req, res) => {
  const pagos = await Pago.find();
  res.json(pagos);
};

paymentsController.createPago = async (req, res) => {
  const { tipoPago, fechaPago, montoPago, descuento, montoTotal } = req.body;
  const nuevoPago = new Pago({ tipoPago, fechaPago, montoPago, descuento, montoTotal });
  await nuevoPago.save();
  res.json({ message: "Pago guardado" });
};

paymentsController.deletePago = async (req, res) => {
  const pagoEliminado = await Pago.findByIdAndDelete(req.params.id);
  if (!pagoEliminado) {
    return res.status(404).json({ message: "Pago no encontrado" });
  }
  res.json({ message: "Pago eliminado" });
};

paymentsController.updatePago = async (req, res) => {
  const { tipoPago, fechaPago, montoPago, descuento, montoTotal } = req.body;
  await Pago.findByIdAndUpdate(req.params.id, { tipoPago, fechaPago, montoPago, descuento, montoTotal }, { new: true });
  res.json({ message: "Pago actualizado" });
};

export default paymentsController;