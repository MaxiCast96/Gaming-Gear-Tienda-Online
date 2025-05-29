import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import employeeModel from "../models/Employees.js";
import customerModel from "../models/Customers.js";
import { config } from "../config.js";

const registerController = {};

registerController.registerEmployee = async (req, res) => {
  const { nombre, rol, edad, dui, correoElectronico, telefono, password } = req.body;

  try {
    // Normalizar correo
    const emailKey = correoElectronico.toLowerCase();

    // Verificar existencia
    if (await employeeModel.findOne({ correoElectronico: emailKey })) {
      return res.status(400).json({ success: false, message: "El empleado ya existe con este correo electrónico" });
    }
    if (await employeeModel.findOne({ dui })) {
      return res.status(400).json({ success: false, message: "Ya existe un empleado con este DUI" });
    }

    const passwordHash = await bcryptjs.hash(password, 12);
    const newEmployee = new employeeModel({ nombre, rol, edad, dui, correoElectronico: emailKey, telefono, password: passwordHash });
    await newEmployee.save();

    // Generar token
    jsonwebtoken.sign(
      { id: newEmployee._id, userType: 'employee', email: emailKey },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) {
          console.error("Error generando token:", error);
          return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
        res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        res.status(201).json({ success: true, message: "Empleado registrado exitosamente", employee: { id: newEmployee._id, nombre: newEmployee.nombre, rol: newEmployee.rol, correoElectronico: emailKey } });
      }
    );
  } catch (error) {
    console.error("Error en registro de empleado:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

registerController.registerCustomer = async (req, res) => {
  const { nombre, edad, dui, correoElectronico, direccion, telefono, password } = req.body;

  try {
    const emailKey = correoElectronico.toLowerCase();
    if (await customerModel.findOne({ correoElectronico: emailKey })) {
      return res.status(400).json({ success: false, message: "El cliente ya existe con este correo electrónico" });
    }
    if (await customerModel.findOne({ dui })) {
      return res.status(400).json({ success: false, message: "Ya existe un cliente con este DUI" });
    }

    const passwordHash = await bcryptjs.hash(password, 12);
    const newCustomer = new customerModel({ nombre, edad, dui, correoElectronico: emailKey, direccion, telefono, password: passwordHash });
    await newCustomer.save();

    jsonwebtoken.sign(
      { id: newCustomer._id, userType: 'customer', email: emailKey },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) {
          console.error("Error generando token:", error);
          return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
        res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
        res.status(201).json({ success: true, message: "Cliente registrado exitosamente", customer: { id: newCustomer._id, nombre: newCustomer.nombre, correoElectronico: emailKey } });
      }
    );
  } catch (error) {
    console.error("Error en registro de cliente:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

registerController.register = (req, res) => {
  const { userType } = req.body;
  if (userType === 'employee') return registerController.registerEmployee(req, res);
  if (userType === 'customer') return registerController.registerCustomer(req, res);
  return res.status(400).json({ success: false, message: "Tipo de usuario no válido. Use 'employee' o 'customer'" });
};

export default registerController;
