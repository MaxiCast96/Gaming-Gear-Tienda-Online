import nodemailer from 'nodemailer';
import { config } from '../config.js';

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail', // o tu proveedor de email preferido
      auth: {
        user: config.EMAIL.user,
        pass: config.EMAIL.password
      }
    });
  }

  async sendConfirmationEmail(email, confirmationCode, nombre) {
    const mailOptions = {
      from: config.EMAIL.user,
      to: email,
      subject: '🎮 Confirma tu registro - Gaming Clan',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Gaming Clan</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-left: 4px solid #667eea;">
            <h2 style="color: #333; margin-bottom: 20px;">¡Hola ${nombre}!</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Gracias por registrarte en Gaming Clan. Para completar tu registro, 
              por favor confirma tu correo electrónico usando el siguiente código:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <div style="background: #667eea; color: white; font-size: 32px; font-weight: bold; 
                         padding: 20px; border-radius: 8px; letter-spacing: 8px; display: inline-block;">
                ${confirmationCode}
              </div>
            </div>
            
            <p style="color: #666; font-size: 14px;">
              Este código es válido por 5 minutos. Si no solicitaste este registro, 
              puedes ignorar este correo.
            </p>
            
            <div style="border-top: 1px solid #ddd; padding-top: 20px; margin-top: 30px; 
                       text-align: center; color: #999; font-size: 12px;">
              <p>Gaming Clan - Tu comunidad gamer</p>
            </div>
          </div>
        </div>
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      return { success: true };
    } catch (error) {
      console.error('Error enviando email:', error);
      return { success: false, error: error.message };
    }
  }
}

export default new EmailService();