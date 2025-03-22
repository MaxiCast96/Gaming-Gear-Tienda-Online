import { Schema, model } from "mongoose";

// Modelo para Ofertas
const offerSchema = new Schema(
    {
      producto: {
        type: String,
        required: true,
        description: "Productos cuyo precio ha sido reducido temporalmente",
      },
      descuentoPorcentaje: {
        type: Number,
        required: true,
        description: "Porcentaje del precio original el cual será reducido",
      },
    },
    { timestamps: true }
  );
  
  export default model("Oferta", offerSchema);