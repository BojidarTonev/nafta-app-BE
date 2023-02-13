import mongoose from "mongoose";

const GasStation = mongoose.model(
    "GasStation",
    new mongoose.Schema({
        name: String,
        brandName: String,
        brandImageUrl: String,
        phoneNumber: String,
        location: String,
        lat: String,
        len: String,
        availableFuels: [{
                fuelName: String,
                price: Number,
                margin: Number
        }]
    })
);

export default GasStation;