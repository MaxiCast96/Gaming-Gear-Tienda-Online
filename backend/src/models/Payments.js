import { Schema, model } from "mongoose";

// Modelo para Pagos
const paymentSchema = new Schema(
    {
      tipoPago: {
        type: String,
        required: true,
        description: "Método de pago",
      },
      fechaPago: {
        type: Date,
        description: "Fecha del pago",
      },
      montoPago: {
        type: Number,
        required: true,
        description: "Monto original a pagar",
      },
      descuento: {
        type: Number,
        description: "Descuento aplicado",
      },
      montoTotal: {
        type: Number,
        required: true,
        description: "Monto total después de descuento",
      },
    },
    { timestamps: true }
  );
  
  export default model("Pago", paymentSchema);