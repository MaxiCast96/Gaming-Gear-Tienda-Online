import { Schema, model } from "mongoose";

// Modelo para Favoritos
const favoriteSchema = new Schema(
    {
      cliente: {
        type: String,
        required: true,
        description: "Información identificativa del cliente que ha marcado un producto como favorito",
      },
      producto: {
        type: String,
        required: true,
        description: "Producto guardado en favoritos por el cliente",
      },
    },
    { timestamps: true }
  );
  
  export default model("Favorito", favoriteSchema);