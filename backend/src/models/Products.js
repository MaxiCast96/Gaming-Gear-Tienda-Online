import { Schema, model } from "mongoose";

// Modelo para Productos
const productsSchema = new Schema(
    {
      nombre: {
        type: String,
        required: true,
        description: "Nombre del producto",
      },
      categoria: {
        type: String,
        description: "Categoría del producto",
      },
      precio: {
        type: Number,
        required: true,
        description: "Costo del producto",
      },
      cantidad: {
        type: Number,
        description: "Cantidad disponible",
      },
      descripcion: {
        type: String,
        description: "Descripción del producto",
      },
      imagenPrincipal: {
      type: String,
      required: true,
      description: "Imagen principal del producto",
    },
    imagenesSecundarias: {
      type: [String], // Array de imágenes secundarias
      description: "Imágenes secundarias del producto",
    }
    },
    { timestamps: true }
  );
  
  export default model("Products", productsSchema);