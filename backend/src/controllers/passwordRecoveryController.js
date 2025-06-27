// Controlador para Recuperación de Contraseña
import Cliente from "../models/Customers.js";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

const passwordRecoveryController = {};

// Configuración del transportador de email (ajusta según tu proveedor)
const transporter = nodemailer.createTransport({
  service: 'gmail', // o tu proveedor de email
  auth: {
    user: process.env.EMAIL_USER, // tu email
    pass: process.env.EMAIL_PASSWORD // tu contraseña de aplicación
  }
});

// Función para generar código de 6 dígitos
const generateRecoveryCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// POST /api/forgot-password - Solicitar código de recuperación
passwordRecoveryController.forgotPassword = async (req, res) => {
  console.log('=== INICIO FORGOT PASSWORD ===');
  console.log('Body recibido:', req.body);
  
  try {
    const { correoElectronico } = req.body;
    
    if (!correoElectronico) {
      console.log('❌ Email no proporcionado');
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico es requerido'
      });
    }

    console.log('🔍 Buscando usuario con email:', correoElectronico);
    
    // Buscar el usuario por email
    const usuario = await Cliente.findOne({ correoElectronico });
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({
        success: false,
        message: 'No existe una cuenta con este correo electrónico'
      });
    }

    console.log('✅ Usuario encontrado:', usuario._id);

    // Generar código de recuperación
    const recoveryCode = generateRecoveryCode();
    const recoveryExpires = new Date(Date.now() + 15 * 60 * 1000); // Expira en 15 minutos

    console.log('🔐 Código generado:', recoveryCode);
    console.log('⏰ Expira en:', recoveryExpires);

    // Guardar código en el usuario
    usuario.recoveryCode = recoveryCode;
    usuario.recoveryExpires = recoveryExpires;
    await usuario.save();

    console.log('💾 Código guardado en base de datos');

    // Configurar el email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correoElectronico,
      subject: '🎮 Código de Recuperación de Contraseña - Gaming Clan',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin-bottom: 10px;">🎮 Gaming Clan</h1>
            <h2 style="color: white; margin-bottom: 20px;">Recuperación de Contraseña</h2>
          </div>
          
          <div style="background-color: #2d2d2d; padding: 25px; border-radius: 10px; text-align: center;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              Hemos recibido una solicitud para restablecer tu contraseña.
            </p>
            
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">Tu código de recuperación es:</p>
              <h1 style="margin: 10px 0; font-size: 32px; letter-spacing: 5px; font-weight: bold;">
                ${recoveryCode}
              </h1>
            </div>
            
            <p style="font-size: 14px; color: #cccccc; margin-top: 20px;">
              Este código expirará en 15 minutos por seguridad.
            </p>
            
            <p style="font-size: 14px; color: #cccccc; margin-top: 15px;">
              Si no solicitaste este cambio, puedes ignorar este correo.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
            <p style="font-size: 12px; color: #888;">
              Gaming Clan - Sistema de Gestión
            </p>
          </div>
        </div>
      `
    };

    console.log('📧 Enviando email...');
    
    // Enviar el email
    await transporter.sendMail(mailOptions);
    
    console.log('✅ Email enviado correctamente');

    res.json({
      success: true,
      message: 'Código de recuperación enviado a tu correo electrónico'
    });

  } catch (error) {
    console.error('💥 Error en forgot password:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  } finally {
    console.log('=== FIN FORGOT PASSWORD ===');
  }
};

// POST /api/reset-password - Cambiar contraseña con código
passwordRecoveryController.resetPassword = async (req, res) => {
  console.log('=== INICIO RESET PASSWORD ===');
  console.log('Body recibido:', req.body);
  
  try {
    const { correoElectronico, recoveryCode, newPassword } = req.body;
    
    if (!correoElectronico || !recoveryCode || !newPassword) {
      console.log('❌ Datos incompletos');
      return res.status(400).json({
        success: false,
        message: 'Todos los campos son requeridos'
      });
    }

    if (newPassword.length < 6) {
      console.log('❌ Contraseña muy corta');
      return res.status(400).json({
        success: false,
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    console.log('🔍 Buscando usuario con email:', correoElectronico);
    
    // Buscar el usuario
    const usuario = await Cliente.findOne({ correoElectronico });
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    console.log('✅ Usuario encontrado:', usuario._id);
    console.log('🔐 Código en BD:', usuario.recoveryCode);
    console.log('🔐 Código recibido:', recoveryCode);
    console.log('⏰ Código expira:', usuario.recoveryExpires);
    console.log('⏰ Tiempo actual:', new Date());

    // Verificar que existe código de recuperación
    if (!usuario.recoveryCode || !usuario.recoveryExpires) {
      console.log('❌ No hay código de recuperación activo');
      return res.status(400).json({
        success: false,
        message: 'No hay solicitud de recuperación activa para este usuario'
      });
    }

    // Verificar que el código no haya expirado
    if (new Date() > usuario.recoveryExpires) {
      console.log('❌ Código expirado');
      // Limpiar código expirado
      usuario.recoveryCode = undefined;
      usuario.recoveryExpires = undefined;
      await usuario.save();
      
      return res.status(400).json({
        success: false,
        message: 'El código de recuperación ha expirado. Solicita uno nuevo.'
      });
    }

    // Verificar que el código sea correcto
    if (usuario.recoveryCode !== recoveryCode) {
      console.log('❌ Código incorrecto');
      return res.status(400).json({
        success: false,
        message: 'Código de recuperación inválido'
      });
    }

    console.log('✅ Código válido, cambiando contraseña...');

    // Encriptar la nueva contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    console.log('🔐 Contraseña encriptada');

    // Actualizar la contraseña y limpiar código de recuperación
    usuario.password = hashedPassword;
    usuario.recoveryCode = undefined;
    usuario.recoveryExpires = undefined;
    await usuario.save();

    console.log('✅ Contraseña actualizada en base de datos');

    // Enviar email de confirmación
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: correoElectronico,
      subject: '🎮 Contraseña Actualizada - Gaming Clan',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin-bottom: 10px;">🎮 Gaming Clan</h1>
            <h2 style="color: white; margin-bottom: 20px;">Contraseña Actualizada</h2>
          </div>
          
          <div style="background-color: #2d2d2d; padding: 25px; border-radius: 10px; text-align: center;">
            <div style="background-color: #16a34a; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h2 style="margin: 0;">✅ ¡Contraseña actualizada exitosamente!</h2>
            </div>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Tu contraseña ha sido cambiada correctamente.
            </p>
            
            <p style="font-size: 14px; color: #cccccc;">
              Si no realizaste este cambio, contacta inmediatamente con nuestro soporte.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #444;">
            <p style="font-size: 12px; color: #888;">
              Gaming Clan - Sistema de Gestión
            </p>
          </div>
        </div>
      `
    };

    try {
      await transporter.sendMail(confirmationMailOptions);
      console.log('📧 Email de confirmación enviado');
    } catch (emailError) {
      console.warn('⚠️ Error enviando email de confirmación:', emailError.message);
      // No fallar si el email no se puede enviar
    }

    res.json({
      success: true,
      message: 'Contraseña actualizada exitosamente'
    });

  } catch (error) {
    console.error('💥 Error en reset password:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  } finally {
    console.log('=== FIN RESET PASSWORD ===');
  }
};

// POST /api/resend-recovery-code - Reenviar código de recuperación
passwordRecoveryController.resendRecoveryCode = async (req, res) => {
  console.log('=== INICIO RESEND RECOVERY CODE ===');
  console.log('Body recibido:', req.body);
  
  try {
    const { correoElectronico } = req.body;
    
    if (!correoElectronico) {
      console.log('❌ Email no proporcionado');
      return res.status(400).json({
        success: false,
        message: 'El correo electrónico es requerido'
      });
    }

    console.log('🔍 Buscando usuario con email:', correoElectronico);
    
    const usuario = await Cliente.findOne({ correoElectronico });
    
    if (!usuario) {
      console.log('❌ Usuario no encontrado');
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    console.log('✅ Usuario encontrado:', usuario._id);

    // Generar nuevo código
    const recoveryCode = generateRecoveryCode();
    const recoveryExpires = new Date(Date.now() + 15 * 60 * 1000);

    console.log('🔐 Nuevo código generado:', recoveryCode);

    // Actualizar código en base de datos
    usuario.recoveryCode = recoveryCode;
    usuario.recoveryExpires = recoveryExpires;
    await usuario.save();

    console.log('💾 Nuevo código guardado');

    // Enviar email con nuevo código
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correoElectronico,
      subject: '🎮 Nuevo Código de Recuperación - Gaming Clan',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: white;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #dc2626; margin-bottom: 10px;">🎮 Gaming Clan</h1>
            <h2 style="color: white; margin-bottom: 20px;">Nuevo Código de Recuperación</h2>
          </div>
          
          <div style="background-color: #2d2d2d; padding: 25px; border-radius: 10px; text-align: center;">
            <p style="font-size: 16px; margin-bottom: 20px;">
              Has solicitado un nuevo código de recuperación.
            </p>
            
            <div style="background-color: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; font-size: 14px;">Tu nuevo código es:</p>
              <h1 style="margin: 10px 0; font-size: 32px; letter-spacing: 5px; font-weight: bold;">
                ${recoveryCode}
              </h1>
            </div>
            
            <p style="font-size: 14px; color: #cccccc;">
              Este código expirará en 15 minutos.
            </p>
          </div>
        </div>
      `
    };

    console.log('📧 Enviando nuevo código por email...');
    
    await transporter.sendMail(mailOptions);
    
    console.log('✅ Nuevo código enviado');

    res.json({
      success: true,
      message: 'Nuevo código enviado a tu correo electrónico'
    });

  } catch (error) {
    console.error('💥 Error en resend recovery code:', error);
    res.status(500).json({
      success: false,
      message: 'Error interno del servidor: ' + error.message
    });
  } finally {
    console.log('=== FIN RESEND RECOVERY CODE ===');
  }
};

export default passwordRecoveryController;