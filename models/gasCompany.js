import mongoose from "mongoose";

const GasCompany = mongoose.model(
    "GasCompany",
    new mongoose.Schema({
        name: String,
        image: String,
        website: String,
        email: String,
        gasStations: [{
                type: mongoose.Schema.Types.ObjectId,
                ref: "GasStation"
        }]
    })
);

export default GasCompany;