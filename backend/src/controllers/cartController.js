import Carrito from "../models/Cart.js";

const cartController = {};

// SELECT (Get cart for a specific client)
cartController.getCarritos = async (req, res) => {
    try {
        const { clientId } = req.params; // Assuming client ID is passed as a parameter
        const carrito = await Carrito.findOne({ cliente: clientId });
        if (!carrito) {
            return res.json({ productos: [], total: 0 }); // Return empty cart if not found
        }
        res.json(carrito);
    } catch (error) {
        console.error("Error al obtener carrito:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// INSERT (Add or update product in cart)
cartController.createCarrito = async (req, res) => {
    const { productId, name, price, image, quantity = 1, cliente } = req.body;

    if (!productId || !name || !price || !cliente) {
        return res.status(400).json({ message: "Faltan datos requeridos para agregar al carrito" });
    }

    try {
        let carrito = await Carrito.findOne({ cliente });

        if (!carrito) {
            // If cart doesn't exist for the client, create a new one
            carrito = new Carrito({
                cliente,
                productos: [{ productId, name, price, image, quantity }],
                total: price * quantity,
            });
        } else {
            // If cart exists, check if product is already in it
            const existingProductIndex = carrito.productos.findIndex(
                (item) => item.productId.toString() === productId
            );

            if (existingProductIndex > -1) {
                // Product exists, update quantity
                carrito.productos[existingProductIndex].quantity += quantity;
                carrito.productos[existingProductIndex].price = price; // Update price in case it changed
                carrito.productos[existingProductIndex].image = image; // Update image in case it changed
                carrito.productos[existingProductIndex].name = name; // Update name in case it changed

            } else {
                // Product does not exist, add as new item
                carrito.productos.push({ productId, name, price, image, quantity });
            }
            // Recalculate total
            carrito.total = carrito.productos.reduce((sum, item) => sum + item.price * item.quantity, 0);
        }

        await carrito.save();
        res.status(200).json({ message: "Producto guardado/actualizado en carrito", carrito });
    } catch (error) {
        console.error("Error al guardar/actualizar carrito:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// DELETE (Remove product from cart or delete entire cart)
cartController.deleteCarrito = async (req, res) => {
    const { id } = req.params; // Cart ID
    const { productId } = req.body; // Product ID to remove

    try {
        if (productId) {
            // Remove a specific product from the cart
            const carrito = await Carrito.findById(id);

            if (!carrito) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }

            carrito.productos = carrito.productos.filter(
                (item) => item.productId.toString() !== productId
            );

            carrito.total = carrito.productos.reduce((sum, item) => sum + item.price * item.quantity, 0);

            if (carrito.productos.length === 0) {
                // If no products left, delete the cart
                await Carrito.findByIdAndDelete(id);
                return res.json({ message: "Producto eliminado y carrito vacío" });
            } else {
                await carrito.save();
                return res.json({ message: "Producto eliminado del carrito", carrito });
            }
        } else {
            // Delete the entire cart
            const carritoEliminado = await Carrito.findByIdAndDelete(id);
            if (!carritoEliminado) {
                return res.status(404).json({ message: "Carrito no encontrado" });
            }
            res.json({ message: "Carrito eliminado completamente" });
        }
    } catch (error) {
        console.error("Error al eliminar carrito/producto:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

// UPDATE (Update product quantity or other details in cart)
cartController.updateCarrito = async (req, res) => {
    const { id } = req.params; // Cart ID
    const { productId, quantity } = req.body;

    if (!productId || quantity === undefined) {
        return res.status(400).json({ message: "Faltan datos de producto o cantidad para actualizar el carrito" });
    }

    try {
        const carrito = await Carrito.findById(id);

        if (!carrito) {
            return res.status(404).json({ message: "Carrito no encontrado" });
        }

        const productToUpdate = carrito.productos.find(
            (item) => item.productId.toString() === productId
        );

        if (!productToUpdate) {
            return res.status(404).json({ message: "Producto no encontrado en el carrito" });
        }

        productToUpdate.quantity = quantity;

        if (productToUpdate.quantity <= 0) {
            // If quantity is 0 or less, remove the product
            carrito.productos = carrito.productos.filter(
                (item) => item.productId.toString() !== productId
            );
        }

        carrito.total = carrito.productos.reduce((sum, item) => sum + item.price * item.quantity, 0);

        await carrito.save();
        res.json({ message: "Carrito actualizado", carrito });
    } catch (error) {
        console.error("Error al actualizar carrito:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};

export default cartController;