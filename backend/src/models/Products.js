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
    },
    { timestamps: true }
  );
  
  export default model("Products", productsSchema);