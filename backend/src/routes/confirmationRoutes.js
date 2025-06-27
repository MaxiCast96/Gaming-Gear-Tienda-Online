import { Router } from 'express';
import Customer from '../models/Customers.js'; // Ajusta la ruta según tu estructura

const router = Router();

// POST /api/confirm-registration - Confirmar registro con código
router.post('/', async (req, res) => {
  console.log('=== CONFIRMACIÓN BACKEND ===');
  console.log('Datos recibidos:', req.body);

  try {
    const { correoElectronico, confirmationCode } = req.body;

    if (!correoElectronico || !confirmationCode) {
      return res.status(400).json({
        success: false,
        message: 'Email y código de confirmación son requeridos'
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

    // Verificar código
    if (!customer.confirmationCode || customer.confirmationCode !== confirmationCode) {
      console.log('Código incorrecto. Esperado:', customer.confirmationCode, 'Recibido:', confirmationCode);
      return res.status(400).json({
        success: false,
        message: 'Código de confirmación inválido'
      });
    }

    // Verificar expiración
    if (!customer.confirmationCodeExpires || new Date() > customer.confirmationCodeExpires) {
      console.log('Código expirado. Expira:', customer.confirmationCodeExpires, 'Ahora:', new Date());
      return res.status(400).json({
        success: false,
        message: 'El código de confirmación ha expirado'
      });
    }

    // Confirmar el customer
    customer.isConfirmed = true;
    customer.confirmationCode = undefined; // Limpiar el código
    customer.confirmationCodeExpires = undefined; // Limpiar la expiración
    
    await customer.save();

    console.log('✅ Customer confirmado exitosamente:', correoElectronico);

    res.status(200).json({
      success: true,
      message: 'Cuenta confirmada exitosamente',
      data: {
        id: customer._id,
        correoElectronico: customer.correoElectronico,
        nombre: customer.nombre,
        isConfirmed: customer.isConfirmed
      }
    });

  } catch (error) {
    console.error('💥 Error en confirmación:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  }
});

export default router;