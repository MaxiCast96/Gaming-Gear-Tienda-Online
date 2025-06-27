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
import cors from 'cors'
import confirmationRoutes from '../backend/src/routes/confirmationRoutes.js';
import resendRoutes from '../backend/src/routes/resendRoutes.js';
import passwordRecoveryRoutes from '../backend/src/routes/passwordRecovery.js';


//Creo una constante que es igual a la libreria

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));

// Aumentar el límite para JSON
app.use(express.json({ limit: '50mb' })); // O el tamaño que necesites
app.use(express.urlencoded({ limit: '50mb', extended: true }));


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


app.use("/api/register", registerRoutes); // Ahora tendrás /api/register/employee y /api/register/customer
app.use("/api/login", loginRoute);
app.use("/api/RecoveryPassword", recoveryPasswordRoutes);
//Exporto la constante para poder usar express en otros archivos

app.use("/api/confirm-registration", confirmationRoutes);
app.use("/api/resend-confirmation", resendRoutes);
app.use('/api', passwordRecoveryRoutes);

export default app;