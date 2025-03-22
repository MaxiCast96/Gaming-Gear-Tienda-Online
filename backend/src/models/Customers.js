import { Schema, model } from "mongoose";

// Modelo para Clientes
const customerSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
      description: "Nombre del cliente",
    },
    edad: {
      type: Number,
      required: true,
      description: "Edad del cliente",
    },
    dui: {
      type: Number,
      required: true,
      description: "DUI del cliente",
    },
    correoElectronico: {
      type: String,
      required: true,
      description: "Correo del cliente",
    },
    direccion: {
      type: String,
      description: "Dirección del cliente",
    },
    telefono: {
      type: Number,
      description: "Teléfono del cliente",
    },
  },
  { timestamps: true }
);

export default model("Customer", customerSchema);