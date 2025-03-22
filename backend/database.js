import mongoose from "mongoose";

const URI = "mongodb://0.0.0.0:27017/GamingGear";

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