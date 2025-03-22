const ordersController = {};
import Pedido from "../models/Orders.js";

ordersController.getPedidos = async (req, res) => {
  const pedidos = await Pedido.find().populate("productosAEntregar pago");
  res.json(pedidos);
};

ordersController.createPedido = async (req, res) => {
  const { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago } = req.body;
  const nuevoPedido = new Pedido({ fechaCompra, fechaEntregaEstimada, productosAEntregar, pago });
  await nuevoPedido.save();
  res.json({ message: "Pedido guardado" });
};

ordersController.deletePedido = async (req, res) => {
  const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
  if (!pedidoEliminado) {
    return res.status(404).json({ message: "Pedido no encontrado" });
  }
  res.json({ message: "Pedido eliminado" });
};

ordersController.updatePedido = async (req, res) => {
  const { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago } = req.body;
  await Pedido.findByIdAndUpdate(req.params.id, { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago }, { new: true });
  res.json({ message: "Pedido actualizado" });
};

export default ordersController;