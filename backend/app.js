//Importar libreria express

import express from 'express';
import categoriesRoutes from "../backend/src/routes/categories.js"
import cartRoutes from  '../backend/src/routes/cart.js'
import customersRoutes from '../backend/src/routes/customers.js'
import employeesRoutes from '../backend/src/routes/employees.js'
import favoritesRoutes from '../backend/src/routes/favorites.js'
import offersReotes from '../backend/src/routes/offers.js'
import ordersRoutes from '../backend/src/routes/orders.js'
import paymentRoutes from '../backend/src/routes/payments.js'
import productsRoutes from '../backend/src/routes/products.js'
import reviewsRoutes from '../backend/src/routes/reviews.js'

//Creo una constante que es igual a la libreria

const app = express();

app.use(express.json());

app.use("/api/categories", categoriesRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/customers", customersRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/offers", offersReotes);
app.use("/api/orders", ordersRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/reviews", reviewsRoutes);

//Exporto la constante para poder usar express en otros archivos

export default app;