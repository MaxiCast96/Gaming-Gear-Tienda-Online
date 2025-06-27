import { Router } from 'express';
import Customer from '../models/Customers.js'; // Ajusta la ruta según tu estructura
import EmailService from '../services/emailService.js';

const router = Router();

// Función para generar código de 6 dígitos
const generateConfirmationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /api/resend-confirmation - Reenviar código de confirmación
router.post('/', async (req, res) => {
  console.log('=== REENVÍO BACKEND ===');
  console.log('Datos recibidos:', req.body);

  try {
    const { correoElectronico } = req.body;

    if (!correoElectronico) {
      return res.status(400).json({
        success: false,
        message: 'Email es requerido'
      });
    }

    // Buscar el customer
    const customer = await Customer.findOne({
      correoElectronico: correoElectronico.toLowerCase()
    });

    if (!customer) {
      console.log('Customer no encontrado:', correoElectronico);
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar si ya está confirmado
    if (customer.isConfirmed) {
      console.log('Customer ya confirmado:', correoElectronico);
      return res.status(400).json({
        success: false,
        message: 'Esta cuenta ya ha sido confirmada'
      });
    }

    // Generar nuevo código
    const confirmationCode = generateConfirmationCode();
    const confirmationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutos

    console.log('Nuevo código generado:', confirmationCode);

    // Actualizar el customer
    customer.confirmationCode = confirmationCode;
    customer.confirmationCodeExpires = confirmationCodeExpires;
    
    await customer.save();

    // Enviar email
    const emailResult = await EmailService.sendConfirmationEmail(
      correoElectronico,
      confirmationCode,
      customer.nombre
    );

    if (!emailResult.success) {
      console.error('Error enviando email:', emailResult.error);
      return res.status(500).json({
        success: false,
        message: 'Error enviando el código de confirmación'
      });
    }

    console.log('✅ Código reenviado exitosamente');

    res.status(200).json({
      success: true,
      message: 'Código de confirmación reenviado exitosamente'
    });

  } catch (error) {
    console.error('💥 Error en reenvío:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  }
});

export default router;