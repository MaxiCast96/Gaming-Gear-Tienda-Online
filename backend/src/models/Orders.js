import { Schema, model } from "mongoose";

// Modelo para Pedidos
const orderSchema = new Schema(
    {
      fechaCompra: {
        type: Date,
        required: true,
        description: "Fecha de compra",
      },
      fechaEntregaEstimada: {
        type: Date,
        description: "Fecha estimada de entrega",
      },
      productosAEntregar: {
        type: Schema.Types.ObjectId,
        ref: "Producto",
        description: "Productos a entregar",
      },
      pago: {
        type: Schema.Types.ObjectId,
        ref: "Pago",
        description: "Método de pago",
      },
    },
    { timestamps: true }
  );
  
  export default model("Pedido", orderSchema);