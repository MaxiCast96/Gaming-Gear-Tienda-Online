import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import clientModel from "../models/Customers.js";
import employeesModel from "../models/Employees.js";
import { config } from "../config.js";

const loginController = {};

loginController.login = async (req, res) => {
  const { email, password } = req.body;

  console.log('🚀 INICIO DEL LOGIN CONTROLLER');
  console.log('📨 Datos recibidos:', { email, password: '***' });

  try {
    let userFound = null;
    let userType = null;

    console.log('🔍 Buscando usuario con email:', email);

    // Admin login
    if (email === config.admin.email && password === config.admin.password) {
      userType = "admin";
      userFound = { _id: "admin", nombre: "Admin", correoElectronico: email };
      console.log('👑 Login como admin detectado');
    } else {
      console.log('👨‍💼 Buscando en empleados...');
      // Buscar empleado por 'correoElectronico'
      userFound = await employeesModel.findOne({ correoElectronico: email.toLowerCase() });
      
      if (userFound) {
        userType = "employee";
        console.log('✅ Usuario encontrado como empleado:');
        console.log('   - ID:', userFound._id);
        console.log('   - Nombre:', userFound.nombre);
        console.log('   - Email:', userFound.correoElectronico);
      } else {
        console.log('👤 No encontrado en empleados, buscando en clientes...');
        // Si no es empleado, buscar cliente
        userFound = await clientModel.findOne({ correoElectronico: email.toLowerCase() });
        if (userFound) {
          userType = "client";
          console.log('✅ Usuario encontrado como cliente:');
          console.log('   - ID:', userFound._id);
          console.log('   - Nombre:', userFound.nombre);
          console.log('   - Email:', userFound.correoElectronico);
        }
      }
    }

    // Si no encuentra usuario
    if (!userFound) {
      console.log('❌ Usuario no encontrado en ninguna colección');
      return res.status(404).json({ 
        success: false, 
        message: "Usuario no encontrado" 
      });
    }

    console.log('🔐 Validando contraseña...');
    // Validar contraseña (no para admin)
    if (userType !== "admin") {
      const isMatch = await bcryptjs.compare(password, userFound.password);
      if (!isMatch) {
        console.log('❌ Contraseña incorrecta');
        return res.status(401).json({ 
          success: false, 
          message: "Contraseña incorrecta" 
        });
      }
      console.log('✅ Contraseña válida');
    }

    console.log('📦 Preparando datos del usuario...');
    
    // ✅ CORRECCIÓN: Preparar datos del usuario ANTES del JWT
    const userData = {
      id: userFound._id,
      nombre: userFound.nombre,
      email: userFound.correoElectronico,
      userType
    };

    console.log('👤 Datos del usuario preparados:', JSON.stringify(userData, null, 2));

    console.log('🔐 Generando token JWT...');
    
    // ✅ CORRECCIÓN: Datos para el token
    const tokenPayload = {
      id: userFound._id, 
      nombre: userFound.nombre,
      email: userFound.correoElectronico,
      userType 
    };
    
    console.log('🏷️ Payload del token:', JSON.stringify(tokenPayload, null, 2));

    try {
      const token = jsonwebtoken.sign(
        tokenPayload, 
        config.JWT.secret,
        { expiresIn: config.JWT.expires }
      );

      console.log('✅ Token generado exitosamente');
      console.log('🔑 Token length:', token.length);
      
      // Establecer cookie
      res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
      
      console.log('🍪 Cookie establecida');
      
      // ✅ CORRECCIÓN: Respuesta completa con todos los datos
      const response = { 
        success: true, 
        message: "login successful",
        userType,
        token,  // ✅ IMPORTANTE: Incluir el token en la respuesta
        user: userData  // ✅ IMPORTANTE: Incluir los datos del usuario
      };
      
      console.log('📤 RESPUESTA COMPLETA A ENVIAR:');
      console.log(JSON.stringify(response, null, 2));
      
      // ✅ Verificar que la respuesta contiene todo lo necesario
      if (!response.token) {
        console.error('🚨 ERROR: Token faltante en la respuesta');
      }
      if (!response.user) {
        console.error('🚨 ERROR: User faltante en la respuesta');
      }
      if (!response.user?.nombre) {
        console.error('🚨 ERROR: Nombre faltante en user');
      }
      
      console.log('📡 Enviando respuesta al frontend...');
      res.json(response);
      console.log('✅ Respuesta enviada exitosamente');
      
    } catch (tokenError) {
      console.error("❌ Error generando token:", tokenError);
      return res.status(500).json({ 
        success: false, 
        message: "Error generando token de autenticación" 
      });
    }

  } catch (error) {
    console.error("💥 ERROR GENERAL EN LOGIN:", error);
    console.error("Stack trace:", error.stack);
    res.status(500).json({ 
      success: false, 
      message: "Error interno del servidor" 
    });
  }
};

export default loginController;