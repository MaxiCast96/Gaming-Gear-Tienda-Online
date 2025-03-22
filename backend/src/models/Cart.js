import { Schema, model } from "mongoose";

// Modelo para Carritos
const cartSchema = new Schema(
    {
      productos: {
        type: [String],
        required: true,
        description: "Productos agregados al carrito de compras del usuario",
      },
      cliente: {
        type: String,
        required: true,
        description: "Información identificativa del cliente que realiza la compra",
      },
      total: {
        type: Number,
        description: "Monto total de la compra en el carrito",
      },
    },
    { timestamps: true }
  );
  
  export default model("Carrito", cartSchema);


