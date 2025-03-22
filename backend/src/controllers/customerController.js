// Controladores para Cliente
const customerController = {};
import Cliente from "../models/Customers.js";

// SELECT
customerController.getClientes = async (req, res) => {
  const clientes = await Cliente.find();
  res.json(clientes);
};

// INSERT
customerController.createCliente = async (req, res) => {
  const { nombre, edad, dui, correoElectronico, direccion, telefono } = req.body;
  const nuevoCliente = new Cliente({ nombre, edad, dui, correoElectronico, direccion, telefono });
  await nuevoCliente.save();
  res.json({ message: "Cliente guardado" });
};

// DELETE
customerController.deleteCliente = async (req, res) => {
  const clienteEliminado = await Cliente.findByIdAndDelete(req.params.id);
  if (!clienteEliminado) {
    return res.status(404).json({ message: "Cliente no encontrado" });
  }
  res.json({ message: "Cliente eliminado" });
};

// UPDATE
customerController.updateCliente = async (req, res) => {
  const { nombre, edad, dui, correoElectronico, direccion, telefono } = req.body;
  await Cliente.findByIdAndUpdate(req.params.id, { nombre, edad, dui, correoElectronico, direccion, telefono }, { new: true });
  res.json({ message: "Cliente actualizado" });
};

export default customerController;