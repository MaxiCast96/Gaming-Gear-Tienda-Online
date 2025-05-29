import mongoose from "mongoose";

const URI = "mongodb+srv://prueba:prueba@clusterdeptc.yifegsq.mongodb.net/GamingGear";

mongoose.connect(URI);

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("DB is connected");
})


connection.on("disconnected", () => {
    console.log("DB is disconnected");
})


connection.on("error", () => {
    console.log("DB is dead");
})