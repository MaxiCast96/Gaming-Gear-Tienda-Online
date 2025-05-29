import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const { models } = mongoose;

// Modelo para Empleados
const employeeSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
      description: "Nombre del empleado",
    },
    rol: {
      type: String,
      required: true,
      trim: true,
      description: "Cargo del empleado",
    },
    edad: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      description: "Edad del empleado",
    },
    dui: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      description: "Número de identidad del empleado",
    },
    correoElectronico: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Correo electrónico inválido'],
      description: "Correo del empleado",
    },
    telefono: {
      type: String,
      required: true,
      trim: true,
      description: "Teléfono del empleado",
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      description: "Contraseña del empleado",
    },
    isActive: {
      type: Boolean,
      default: true,
      description: "Estado activo del empleado",
    },
    fechaContratacion: {
      type: Date,
      default: Date.now,
      description: "Fecha de contratación",
    }
  },
  { 
    timestamps: true,
    versionKey: false
  }
);


export default models.Employees || model("Employees", employeeSchema);