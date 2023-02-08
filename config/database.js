import mongoose from "mongoose";
import serverConfig from "./config.js";

export const dbConnection = () => {
    const { dbURL } = serverConfig;
    // to remove warning from console
    mongoose.set("strictQuery", false);

    mongoose.connection.on("error", (err) => {
        console.log("mongoose error => ", err)
    })
    mongoose.connection.on("connected", (res, req) => {
        console.log("mongoose is connected!")
    })

    return mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
};