import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import employeeModel from "../models/Employees.js";
import customerModel from "../models/Customers.js";
import { config } from "../config.js";

// Registro de empleados y clientes
export const registerController = {
  registerEmployee: async (req, res) => {
    const { nombre, rol, edad, dui, correoElectronico, telefono, password } = req.body;
    try {
      const emailKey = correoElectronico.toLowerCase();
      if (await employeeModel.findOne({ correoElectronico: emailKey })) {
        return res.status(400).json({ success: false, message: "El empleado ya existe con este correo electrónico" });
      }
      if (await employeeModel.findOne({ dui })) {
        return res.status(400).json({ success: false, message: "Ya existe un empleado con este DUI" });
      }
      const passwordHash = await bcryptjs.hash(password, 12);
      const newEmployee = new employeeModel({ nombre, rol, edad, dui, correoElectronico: emailKey, telefono, password: passwordHash });
      await newEmployee.save();
      jsonwebtoken.sign(
        { id: newEmployee._id, userType: 'employee', email: emailKey },
        config.JWT.secret,
        { expiresIn: config.JWT.expires },
        (err, token) => {
          if (err) return res.status(500).json({ success: false, message: "Error interno al generar token" });
          res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV==='production', sameSite: 'strict' });
          res.status(201).json({ success: true, message: "Empleado registrado exitosamente", userType: 'employee' });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  },

  registerCustomer: async (req, res) => {
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
        { id: newCustomer._id, userType: 'client', email: emailKey },
        config.JWT.secret,
        { expiresIn: config.JWT.expires },
        (err, token) => {
          if (err) return res.status(500).json({ success: false, message: "Error interno al generar token" });
          res.cookie("authToken", token, { httpOnly: true, secure: process.env.NODE_ENV==='production', sameSite: 'strict' });
          res.status(201).json({ success: true, message: "Cliente registrado exitosamente", userType: 'client' });
        }
      );
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Error interno del servidor" });
    }
  },

  register: (req, res) => {
    const { userType } = req.body;
    if (userType === 'employee') return registerController.registerEmployee(req, res);
    if (userType === 'customer') return registerController.registerCustomer(req, res);
    return res.status(400).json({ success: false, message: "Tipo de usuario no válido. Use 'employee' o 'customer'" });
  }
};

// Login de todos los usuarios
export const loginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const emailKey = email.toLowerCase();
    let userFound = null;
    let userType = null;
    if (emailKey === config.admin.email && password === config.admin.password) {
      userType = 'admin';
      userFound = { _id: 'admin' };
    } else {
      userFound = await employeeModel.findOne({ correoElectronico: emailKey });
      userType = 'employee';
      if (!userFound) {
        userFound = await customerModel.findOne({ correoElectronico: emailKey });
        userType = 'client';
      }
    }
    if (!userFound) return res.status(404).json({ success: false, message: 'user not found' });
    if (userType !== 'admin') {
      const match = await bcryptjs.compare(password, userFound.password);
      if (!match) return res.status(401).json({ success: false, message: 'Invalid password' });
    }
    jsonwebtoken.sign(
      { id: userFound._id, userType, email: emailKey },
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (err, token) => {
        if (err) return res.status(500).json({ success: false, message: 'Error interno al generar token' });
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV==='production', sameSite: 'strict' });
        res.json({ success: true, message: 'login successful', userType });
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};