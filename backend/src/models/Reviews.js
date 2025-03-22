import { Schema, model } from "mongoose";

// Modelo para Reseñas
const reviewSchema = new Schema(
    {
      producto: {
        type: String,
        required: true,
        description: "Producto que será reseñado por los usuarios",
      },
      comentarios: {
        type: String,
        description: "Comentarios y evaluaciones de usuarios sobre el producto",
      },
    },
    { timestamps: true }
  );
  
  export default model("Resena", reviewSchema);