import { Schema, model } from "mongoose";

const productoSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    description: "Nombre del producto"
  },
  precio: {
    type: Number,
    required: true,
    description: "Precio del producto"
  },
  descripcion: {
    type: String,
    description: "Descripción del producto"
  },
  categoria: {
    type: String,
    description: "Categoría del producto"
  },
  stock: {
    type: Number,
    default: 0,
    description: "Stock disponible"
  }
}, { timestamps: true });

export default model("Producto", productoSchema);