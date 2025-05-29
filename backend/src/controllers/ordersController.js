const ordersController = {};
import Pedido from "../models/Orders.js";
import Producto from "../models/Producto.js";

ordersController.getPedidos = async (req, res) => {
  try {
    // Solo populamos productosAEntregar, pago ya es un string
    const pedidos = await Pedido.find().populate("productosAEntregar");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};

ordersController.createPedido = async (req, res) => {
  try {
    const { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago } = req.body;
    const nuevoPedido = new Pedido({ fechaCompra, fechaEntregaEstimada, productosAEntregar, pago });
    await nuevoPedido.save();
    res.json({ message: "Pedido guardado" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear pedido", error: error.message });
  }
};

ordersController.deletePedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pedido", error: error.message });
  }
};

ordersController.updatePedido = async (req, res) => {
  try {
    const { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago } = req.body;
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id, 
      { fechaCompra, fechaEntregaEstimada, productosAEntregar, pago }, 
      { new: true }
    );
    
    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    
    res.json({ message: "Pedido actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pedido", error: error.message });
  }
};

export default ordersController;