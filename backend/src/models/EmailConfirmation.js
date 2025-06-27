import mongoose from 'mongoose';

const emailConfirmationSchema = new mongoose.Schema({
  correoElectronico: {
    type: String,
    required: true,
    lowercase: true
  },
  confirmationCode: {
    type: String,
    required: true
  },
  userData: {
    type: Object,
    required: true
  },
  userType: {
    type: String,
    enum: ['customer', 'employee'],
    required: true
  },
  expiresAt: {
    type: Date,
    default: Date.now,
    expires: 300 // 5 minutos
  },
  attempts: {
    type: Number,
    default: 0,
    max: 3
  }
}, {
  timestamps: true
});

// Índice para mejorar rendimiento
emailConfirmationSchema.index({ correoElectronico: 1 });
emailConfirmationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export default mongoose.model('EmailConfirmation', emailConfirmationSchema);