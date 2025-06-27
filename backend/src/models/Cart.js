import { Schema, model } from "mongoose";

const cartSchema = new Schema(
    {
        productos: [
            {
                productId: {
                    type: Schema.Types.ObjectId, // Assuming product IDs are MongoDB ObjectIds
                    ref: 'Producto', // Reference to your Product model
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true,
                },
                image: {
                    type: String,
                    required: false, // Image might not always be available
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                    default: 1,
                },
            },
        ],
        cliente: {
            type: String, // This could be Schema.Types.ObjectId if referencing a User model
            required: true,
            description: "Información identificativa del cliente que realiza la compra",
        },
        total: {
            type: Number,
            description: "Monto total de la compra en el carrito",
            default: 0,
        },
    },
    { timestamps: true }
);

export default model("Carrito", cartSchema);