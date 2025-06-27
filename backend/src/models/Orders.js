import { Schema, model } from "mongoose";

// Esquema para productos dentro del pedido
const productoPedidoSchema = new Schema({
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Producto",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  image: {
    type: String
  }
});

// Esquema para datos personales
const datosPersonalesSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: true
  },
  correoElectronico: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  notasAdicionales: {
    type: String
  }
});

// Esquema para datos de pago
const datosPagoSchema = new Schema({
  nombreTitular: {
    type: String,
    required: true
  },
  numeroTarjeta: {
    type: String,
    required: true
  },
  fechaVencimiento: {
    type: String,
    required: true
  },
  cvv: {
    type: String,
    required: true
  }
});

// Esquema para montos
const montosSchema = new Schema({
  subtotal: {
    type: String,
    required: true
  },
  descuento: {
    type: String,
    default: "0.00"
  },
  envio: {
    type: String,
    required: true
  },
  total: {
    type: String,
    required: true
  }
});

// Modelo principal para Pedidos
const orderSchema = new Schema(
  {
    fechaCompra: {
      type: Date,
      required: true,
      default: Date.now,
      description: "Fecha de compra",
    },
    fechaEntregaEstimada: {
      type: Date,
      description: "Fecha estimada de entrega",
    },
    productos: [productoPedidoSchema],
    datosPersonales: datosPersonalesSchema,
    datosPago: datosPagoSchema,
    montos: montosSchema,
    codigoDescuento: {
      type: String
    },
    estado: {
      type: String,
      enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
      default: 'pendiente'
    }
  },
  { timestamps: true }
);

export default model("Pedido", orderSchema);