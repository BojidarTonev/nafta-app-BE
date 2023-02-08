import mongoose from "mongoose";

const Fuel = mongoose.model(
    "Fuel",
    new mongoose.Schema({
        name: String,
        image: String,
        averageMonthlyPrice: Number,
        lastMonthAveragePrice: Number,
        margin: Number,
        lastDateCalculatedPrice: Date
    })
);

export default Fuel;