import mongoose from "mongoose";

const GasStation = mongoose.model(
    "GasStation",
    new mongoose.Schema({
        name: String,
        phoneNumber: String,
        location: String,
        lat: String,
        len: String,
        availableFuels: []
    })
);

export default GasStation;