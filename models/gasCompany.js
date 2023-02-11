import mongoose from "mongoose";

const GasCompany = mongoose.model(
    "GasCompany",
    new mongoose.Schema({
        name: String,
        imageUrl: String,
        website: String,
        email: String,
        gasStations: [{
             type: mongoose.Schema.Types.ObjectId,
             ref: "GasStation"
        }],
        fuels: [
            {fuel: String, averagePrice: Number, margin: Number, imageSrc: String}
        ]
    })
);

export default GasCompany;