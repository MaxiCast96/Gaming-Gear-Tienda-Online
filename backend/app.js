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
import registerRoutes from './src/routes/register.js'
import loginRoute from '../backend/src/routes/login.js'
import recoveryPasswordRoutes from '../backend/src/routes/recoveryPassword.js'
//Creo una constante que es igual a la libreria

import cors from "cors";


const app = express();

app.use(express.json());

app.use(
    cors({
        origin: "https://gaming-gear-tienda-online-zkoh.vercel.app",
        credentials: true
    })
);


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


app.use("/api/register", registerRoutes); // Ahora tendrás /api/register/employee y /api/register/customer
app.use("/api/login", loginRoute);
app.use("/api/RecoveryPassword", recoveryPasswordRoutes);
//Exporto la constante para poder usar express en otros archivos

export default app;