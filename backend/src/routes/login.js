import express from "express";
import loginController from '../controllers/loginController.js'; // Asegúrate de que sea el import correcto

const router = express.Router();

// Middleware para logging
router.use((req, res, next) => {
  console.log('🛣️ LOGIN ROUTE HIT:');
  console.log('- Method:', req.method);
  console.log('- URL:', req.url);
  console.log('- Body:', req.body);
  console.log('- Headers:', req.headers);
  next();
});

// Ruta POST para login
router.post("/", loginController.login);

// Middleware para logging de respuesta
router.use((req, res, next) => {
  const originalSend = res.send;
  res.send = function(data) {
    console.log('📤 RESPONSE SENT FROM LOGIN ROUTE:');
    console.log('- Status:', res.statusCode);
    console.log('- Data:', data);
    originalSend.call(res, data);
  };
  next();
});

export default router;