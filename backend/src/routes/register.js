import { Router } from 'express';
import bcrypt from 'bcryptjs';
import Customer from '../models/Customers.js'; // Ajusta la ruta según tu estructura
import EmailService from '../services/emailService.js';

const router = Router();

// Función para generar código de 6 dígitos
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /api/register - Registro de customer
router.post('/', async (req, res) => {
  console.log('=== REGISTRO BACKEND ===');
  console.log('Datos recibidos:', req.body);

  try {
    const { nombre, edad, dui, correoElectronico, direccion, telefono, password, userType } = req.body;

    // Validar que es un customer
    if (userType !== 'customer') {
      return res.status(400).json({
        success: false,
        message: 'Tipo de usuario inválido'
      });
    }

    // Verificar si ya existe un usuario con ese email o DUI
    const existingCustomer = await Customer.findOne({
      $or: [
        { correoElectronico },
        { dui }
      ]
    });

    if (existingCustomer) {
      console.log('Usuario ya existe:', existingCustomer.correoElectronico);
      return res.status(400).json({
        success: false,
        message: 'Ya existe un usuario con ese correo electrónico o DUI'
      });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generar código de confirmación
    const confirmationCode = generateConfirmationCode();
    const confirmationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    console.log('Código generado:', confirmationCode);
    console.log('Expira en:', confirmationCodeExpires);

    // Crear el customer (sin confirmar)
    const newCustomer = new Customer({
      nombre,
      edad: Number(edad),
      dui,
      correoElectronico: correoElectronico.toLowerCase(),
      direccion,
      telefono,
      password: hashedPassword,
      isConfirmed: false,
      confirmationCode,
      confirmationCodeExpires
    });

    await newCustomer.save();
    console.log('Customer creado en BD:', newCustomer._id);

    // Enviar email de confirmación
    const emailResult = await EmailService.sendConfirmationEmail(
      correoElectronico,
      confirmationCode,
      nombre
    );

    if (!emailResult.success) {
      console.error('Error enviando email:', emailResult.error);
      // Eliminar el usuario si no se pudo enviar el email
      await Customer.findByIdAndDelete(newCustomer._id);
      return res.status(500).json({
        success: false,
        message: 'Error enviando el código de confirmación'
      });
    }

    console.log('✅ Email enviado exitosamente');

    res.status(201).json({
      success: true,
      message: 'Registro exitoso. Revisa tu correo para confirmar tu cuenta.',
      data: {
        id: newCustomer._id,
        correoElectronico: newCustomer.correoElectronico,
        nombre: newCustomer.nombre
      }
    });

  } catch (error) {
    console.error('💥 Error en registro:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  }
});

export default router;