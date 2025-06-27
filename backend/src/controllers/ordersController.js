const ordersController = {};
import Pedido from "../models/Orders.js";
import Producto from "../models/Producto.js";

ordersController.getPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.find().populate("productos.productId");
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedidos", error: error.message });
  }
};

ordersController.createPedido = async (req, res) => {
  try {
    const { productos, datosPersonales, datosPago, montos, codigoDescuento } = req.body;
    
    // Validar que todos los campos requeridos estén presentes
    if (!productos || !datosPersonales || !datosPago || !montos) {
      return res.status(400).json({ 
        message: "Faltan datos requeridos",
        required: ["productos", "datosPersonales", "datosPago", "montos"]
      });
    }

    // Validar que haya al menos un producto
    if (!productos.length) {
      return res.status(400).json({ message: "Debe incluir al menos un producto" });
    }

    // Calcular fecha de entrega estimada (7 días desde la fecha actual)
    const fechaEntregaEstimada = new Date();
    fechaEntregaEstimada.setDate(fechaEntregaEstimada.getDate() + 7);

    const nuevoPedido = new Pedido({ 
      productos,
      datosPersonales,
      datosPago: {
        ...datosPago,
        // Ocultar el CVV por seguridad
        cvv: "***"
      },
      montos,
      codigoDescuento,
      fechaCompra: new Date(),
      fechaEntregaEstimada
    });

    const pedidoGuardado = await nuevoPedido.save();
    
    res.status(201).json({ 
      message: "Pedido creado exitosamente",
      pedidoId: pedidoGuardado._id,
      fechaEntregaEstimada: pedidoGuardado.fechaEntregaEstimada
    });
    
  } catch (error) {
    console.error("Error al crear pedido:", error);
    res.status(500).json({ message: "Error al crear pedido", error: error.message });
  }
};

ordersController.getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findById(req.params.id).populate("productos.productId");
    if (!pedido) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pedido", error: error.message });
  }
};

ordersController.deletePedido = async (req, res) => {
  try {
    const pedidoEliminado = await Pedido.findByIdAndDelete(req.params.id);
    if (!pedidoEliminado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    res.json({ message: "Pedido eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pedido", error: error.message });
  }
};

ordersController.updatePedido = async (req, res) => {
  try {
    const { estado, fechaEntregaEstimada } = req.body;
    
    const updateData = {};
    if (estado) updateData.estado = estado;
    if (fechaEntregaEstimada) updateData.fechaEntregaEstimada = fechaEntregaEstimada;
    
    const pedidoActualizado = await Pedido.findByIdAndUpdate(
      req.params.id, 
      updateData, 
      { new: true }
    );
    
    if (!pedidoActualizado) {
      return res.status(404).json({ message: "Pedido no encontrado" });
    }
    
    res.json({ 
      message: "Pedido actualizado exitosamente",
      pedido: pedidoActualizado
    });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pedido", error: error.message });
  }
};

export default ordersController;