// Controladores para Empleado
const employeesController = {};
import Empleado from "../models/Employees.js";

employeesController.getEmpleados = async (req, res) => {
  const empleados = await Empleado.find();
  res.json(empleados);
};

employeesController.createEmpleado = async (req, res) => {
  const { nombre, rol, edad, dui, correoElectronico, telefono } = req.body;
  const nuevoEmpleado = new Empleado({ nombre, rol, edad, dui, correoElectronico, telefono });
  await nuevoEmpleado.save();
  res.json({ message: "Empleado guardado" });
};

employeesController.deleteEmpleado = async (req, res) => {
  const empleadoEliminado = await Empleado.findByIdAndDelete(req.params.id);
  if (!empleadoEliminado) {
    return res.status(404).json({ message: "Empleado no encontrado" });
  }
  res.json({ message: "Empleado eliminado" });
};

employeesController.updateEmpleado = async (req, res) => {
  const { nombre, rol, edad, dui, correoElectronico, telefono } = req.body;
  await Empleado.findByIdAndUpdate(req.params.id, { nombre, rol, edad, dui, correoElectronico, telefono }, { new: true });
  res.json({ message: "Empleado actualizado" });
};

export default employeesController;