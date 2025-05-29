import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let userFound = null;
    let userType = null;

    // Admin login
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin" };
    } else {
      // Buscar empleado por 'correoElectronico'
      userFound = await employeesModel.findOne({ correoElectronico: email.toLowerCase() });
      userType = "employee";

      // Si no es empleado, buscar cliente
      if (!userFound) {
        userFound = await clientModel.findOne({ correoElectronico: email.toLowerCase() });
        userType = "client";
      }
    }

    // Si no encuentra usuario
    if (!userFound) {
      return res.status(404).json({ success: false, message: "user not found" });
    }

    // Validar contraseña (no para admin)
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "Invalid password" });
      }
    }

    // Generar JWT
    jsonwebtoken.sign(
      { id: userFound._id, userType, email: email.toLowerCase() }, 
      config.JWT.secret,
      { expiresIn: config.JWT.expires },
      (error, token) => {
        if (error) {
          console.error("Error generando token:", error);
          return res.status(500).json({ success: false, message: "Error interno del servidor" });
        }
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict'
        });
        res.json({ success: true, message: "login successful" });
      }
    );
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export default loginController;
