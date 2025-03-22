import { Schema, model } from "mongoose";

// Modelo para Categorías
const categorieSchema = new Schema(
    {
      nombre: {
        type: String,
        required: true,
        description: "Nombre de la categoría del producto",
      },
      descripcion: {
        type: String,
        description: "Detalles o información adicional acerca de la categoría del producto",
      },
      marcaAsociada: {
        type: String,
        description: "Nombre de la marca asociada con la categoría del producto",
      },
    },
    { timestamps: true }
  );

  export default model("Categoria", categorieSchema);