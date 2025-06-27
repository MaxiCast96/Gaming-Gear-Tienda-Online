import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import employeeModel from "../models/Employees.js";
import customerModel from "../models/Customers.js";
import emailConfirmationModel from "../models/EmailConfirmation.js";
import emailService from "../services/emailService.js";
import { config } from "../config.js";

const registerController = {};

// Función para generar código de 6 dígitos
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

registerController.registerEmployee = async (req, res) => {
  const { nombre, rol, edad, dui, correoElectronico, telefono, password } = req.body;

  try {
    const emailKey = correoElectronico.toLowerCase();

    // Verificar existencia
    if (await employeeModel.findOne({ correoElectronico: emailKey })) {
      return res.status(400).json({ success: false, message: "El empleado ya existe con este correo electrónico" });
    }
    if (await employeeModel.findOne({ dui })) {
      return res.status(400).json({ success: false, message: "Ya existe un empleado con este DUI" });
    }

    // Generar código de confirmación
    const confirmationCode = generateConfirmationCode();
    
    // Guardar datos temporalmente para confirmación
    const tempData = {
      correoElectronico: emailKey,
      confirmationCode,
      userData: { nombre, rol, edad, dui, correoElectronico: emailKey, telefono, password },
      userType: 'employee'
    };

    // Eliminar confirmaciones previas del mismo email
    await emailConfirmationModel.deleteMany({ correoElectronico: emailKey });
    
    // Crear nueva confirmación
    await emailConfirmationModel.create(tempData);

    // Enviar email
    const emailResult = await emailService.sendConfirmationEmail(emailKey, confirmationCode, nombre);
    
    if (!emailResult.success) {
      return res.status(500).json({ success: false, message: "Error enviando correo de confirmación" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Código de confirmación enviado a tu correo" 
    });

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

    // Generar código de confirmación
    const confirmationCode = generateConfirmationCode();
    
    // Guardar datos temporalmente para confirmación
    const tempData = {
      correoElectronico: emailKey,
      confirmationCode,
      userData: { nombre, edad, dui, correoElectronico: emailKey, direccion, telefono, password },
      userType: 'customer'
    };

    // Eliminar confirmaciones previas del mismo email
    await emailConfirmationModel.deleteMany({ correoElectronico: emailKey });
    
    // Crear nueva confirmación
    await emailConfirmationModel.create(tempData);

    // Enviar email
    const emailResult = await emailService.sendConfirmationEmail(emailKey, confirmationCode, nombre);
    
    if (!emailResult.success) {
      return res.status(500).json({ success: false, message: "Error enviando correo de confirmación" });
    }

    res.status(200).json({ 
      success: true, 
      message: "Código de confirmación enviado a tu correo" 
    });

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

// Confirmar registro
registerController.confirmRegistration = async (req, res) => {
  const { correoElectronico, confirmationCode } = req.body;

  try {
    const emailKey = correoElectronico.toLowerCase();
    
    // Buscar confirmación pendiente
    const confirmation = await emailConfirmationModel.findOne({ 
      correoElectronico: emailKey,
      confirmationCode 
    });

    if (!confirmation) {
      return res.status(400).json({ 
        success: false, 
        message: "Código inválido o expirado" 
      });
    }

    // Verificar intentos
    if (confirmation.attempts >= 3) {
      await emailConfirmationModel.deleteOne({ _id: confirmation._id });
      return res.status(400).json({ 
        success: false, 
        message: "Demasiados intentos fallidos. Solicita un nuevo código" 
      });
    }

    const { userData, userType } = confirmation;
    
    try {
      let newUser;
      const passwordHash = await bcryptjs.hash(userData.password, 12);

      if (userType === 'employee') {
        newUser = new employeeModel({
          ...userData,
          password: passwordHash
        });
      } else {
        newUser = new customerModel({
          ...userData,
          password: passwordHash
        });
      }

      await newUser.save();

      // Eliminar confirmación usada
      await emailConfirmationModel.deleteOne({ _id: confirmation._id });

      // Generar token
      jsonwebtoken.sign(
        { id: newUser._id, userType, email: emailKey },
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
          
          res.status(201).json({ 
            success: true, 
            message: `${userType === 'employee' ? 'Empleado' : 'Cliente'} registrado exitosamente`,
            user: { 
              id: newUser._id, 
              nombre: newUser.nombre, 
              correoElectronico: emailKey,
              ...(userType === 'employee' && { rol: newUser.rol })
            }
          });
        }
      );

    } catch (saveError) {
      // Si falla el guardado, incrementar intentos
      await emailConfirmationModel.updateOne(
        { _id: confirmation._id },
        { $inc: { attempts: 1 } }
      );
      
      if (saveError.code === 11000) {
        return res.status(400).json({ 
          success: false, 
          message: "Ya existe un usuario con este correo o DUI" 
        });
      }
      throw saveError;
    }

  } catch (error) {
    console.error("Error en confirmación:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

// Reenviar código
registerController.resendConfirmation = async (req, res) => {
  const { correoElectronico } = req.body;

  try {
    const emailKey = correoElectronico.toLowerCase();
    
    // Buscar confirmación pendiente
    const confirmation = await emailConfirmationModel.findOne({ 
      correoElectronico: emailKey 
    });

    if (!confirmation) {
      return res.status(400).json({ 
        success: false, 
        message: "No hay registro pendiente para este correo" 
      });
    }

    // Generar nuevo código
    const newConfirmationCode = generateConfirmationCode();
    
    // Actualizar confirmación
    await emailConfirmationModel.updateOne(
      { _id: confirmation._id },
      { 
        confirmationCode: newConfirmationCode,
        expiresAt: new Date(),
        attempts: 0
      }
    );

    // Enviar nuevo email
    const emailResult = await emailService.sendConfirmationEmail(
      emailKey, 
      newConfirmationCode, 
      confirmation.userData.nombre
    );
    
    if (!emailResult.success) {
      return res.status(500).json({ 
        success: false, 
        message: "Error enviando correo de confirmación" 
      });
    }

    res.status(200).json({ 
      success: true, 
      message: "Código reenviado a tu correo" 
    });

  } catch (error) {
    console.error("Error reenviando código:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};

export default registerController;