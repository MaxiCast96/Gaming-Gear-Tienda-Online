import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const { models } = mongoose;

// Modelo para Clientes
const customerSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      description: "Nombre del cliente",
    },
    edad: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      description: "Edad del cliente",
    },
    dui: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description: "DUI del cliente",
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Correo electrónico inválido'],
      description: "Correo del cliente",
    },
    direccion: {
      type: String,
      trim: true,
      description: "Dirección del cliente",
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      description: "Teléfono del cliente",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      description: "Contraseña del cliente",
    },
    isActive: {
      type: Boolean,
      default: true,
      description: "Estado activo del cliente",
    }
  },
  { 
    timestamps: true,
    versionKey: false
  }
);


export default models.Customers || model("Customers", customerSchema);