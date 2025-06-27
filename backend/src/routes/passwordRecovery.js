// routes/passwordRecovery.js
import express from 'express';
import passwordRecoveryController from '../controllers/passwordRecoveryController.js';

const router = express.Router();

// POST /api/forgot-password - Solicitar código de recuperación
router.post('/forgot-password', passwordRecoveryController.forgotPassword);

// POST /api/reset-password - Cambiar contraseña con código
router.post('/reset-password', passwordRecoveryController.resetPassword);

// POST /api/resend-recovery-code - Reenviar código de recuperación
router.post('/resend-recovery-code', passwordRecoveryController.resendRecoveryCode);

export default router;