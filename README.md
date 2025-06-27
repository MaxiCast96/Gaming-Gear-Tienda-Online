# 🎮 Gaming Gear – Tienda Online

**Gaming Gear** es una tienda en línea especializada en la venta de videojuegos, hardware y periféricos de alto rendimiento para gamers apasionados. Este proyecto tiene como propósito crear una plataforma web moderna, eficiente y amigable, que facilite a los usuarios la compra de productos tecnológicos de manera cómoda y segura desde sus hogares.

## 👥 Integrantes del equipo

- **Luis Fernando Navarro Alemán**
- **Guillermo Rodrigo Chávez**
- **Rafael Alberto Vargas Landaverde**

## 🛠️ Tecnologías utilizadas

Este proyecto fue desarrollado utilizando un stack moderno y eficiente que permite una experiencia fluida tanto para el usuario como para el desarrollador:

- **Vite** – Herramienta ultrarrápida para construir aplicaciones modernas.
- **React (con JavaScript)** – Framework principal para construir interfaces dinámicas y componentes reutilizables.
- **React Router v6** – Para la navegación entre páginas sin recargar, creando una experiencia de aplicación de una sola página (SPA).
- **Tailwind CSS** – Framework de estilos utilitario que permite diseñar interfaces responsivas y elegantes con rapidez.
- **Node.js** – Entorno de ejecución para JavaScript en el servidor.
- **Express.js** – Framework web para Node.js que facilita la creación de APIs.
- **MongoDB** – Base de datos NoSQL utilizada para almacenar productos, usuarios, pedidos, etc.
- **Mongoose** – ODM para MongoDB que facilita la interacción con la base de datos.

## ⚙️ Dependencias instaladas

Durante el desarrollo, se instalaron las siguientes dependencias y herramientas principales:

```bash
npm install react-router-dom
npm install tailwindcss postcss autoprefixer
npm install mongoose
npm install express
npm install cors
npm install dotenv
npm install nodemon --save-dev
```

> **Nota:**  
> - `tailwindcss`, `postcss`, y `autoprefixer` son esenciales para el diseño visual.  
> - `react-router-dom` se usa para el enrutamiento interno en la aplicación React.  
> - `mongoose`, `express`, `cors` y `dotenv` son parte del backend que gestiona la API y la conexión con MongoDB.  
> - `nodemon` facilita el reinicio automático del servidor durante el desarrollo.

## 📁 Estructura del proyecto

El proyecto está organizado en dos carpetas principales:

```
Gaming-Gear-Tienda-Online/
├── backend/          # Código del servidor (API REST)
│   ├── controllers/  # Lógica de negocio y controladores
│   ├── models/       # Modelos de datos (Mongoose)
│   ├── routes/       # Definición de rutas de la API
│   ├── config/       # Configuraciones (DB, variables de entorno)
│   └── server.js     # Punto de entrada del servidor
├── frontend/         # Aplicación cliente (React)
│   ├── src/
│   │   ├── components/ # Componentes reutilizables
│   │   ├── pages/      # Páginas principales de la aplicación
│   │   ├── App.jsx     # Componente principal
│   │   └── main.jsx    # Punto de entrada de React
│   └── tailwind.config.js # Configuración de Tailwind CSS
└── README.md         # Documentación del proyecto
```

## 🛠️ Configuración adicional realizada

- Se configuraron rutas dinámicas usando **React Router v6** para facilitar la navegación entre componentes sin recargar la página.
- Se integró **Tailwind CSS** para estilizar la aplicación con clases utilitarias.
- Se utilizó **MongoDB Atlas** como base de datos en la nube para mayor accesibilidad.
- Se manejaron variables de entorno con `.env` para proteger datos sensibles como claves y URIs.
- Se implementó **CORS** para permitir la comunicación entre frontend y backend en diferentes puertos o dominios.

## 🚀 Cómo ejecutar la aplicación

### Requisitos previos

- [Node.js](https://nodejs.org/) (versión 14 o superior)
- [MongoDB](https://www.mongodb.com/) (puede ser local o en la nube)
- [Git](https://git-scm.com/)

### Pasos para la instalación y ejecución

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MaxiCast96/Gaming-Gear-Tienda-Online.git
   cd Gaming-Gear-Tienda-Online
   ```

2. **Configurar el backend**
   ```bash
   cd backend
   npm install
   ```
   Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:
   ```env
   PORT=5000
   MONGODB_URI=conexión_a_MongoDB
   ```
   Iniciar el servidor:
   ```bash
   node index.js
   ```

3. **Configurar el frontend**
   En una nueva terminal:
   ```bash
   cd frontend
   cd gaming-gear
   npm install
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:5173`.

## 📌 Funcionalidades clave

- **Catálogo de productos**: Visualización de productos con detalles como nombre, precio y descripción.
- **Carrito de compras**: Añadir y eliminar productos del carrito con funcionalidad completa.
- **Gestión de usuarios**: Registro, inicio de sesión y autenticación de usuarios.
- **Procesamiento de pedidos**: Realizar pedidos y visualizar historial.
- **Panel de administración**: Gestión de productos y pedidos (en desarrollo).
- **Interfaz responsiva**: Diseño adaptativo para cualquier dispositivo.
- **Envío a domicilio**: Sistema automatizado de envíos.

## 📌 Objetivo del proyecto

El objetivo principal es brindar una solución web completa para comercializar productos gaming, con énfasis en:

- Interfaz moderna, intuitiva y responsiva para cualquier dispositivo.
- Visualización clara y atractiva de los productos disponibles.
- Carrito de compras funcional y experiencia de usuario fluida.
- Gestión eficiente de usuarios y pedidos desde el backend.
- Conexión robusta con la base de datos para garantizar una experiencia sin interrupciones.
- Sistema de envío a domicilio automatizado para mayor comodidad del cliente.
