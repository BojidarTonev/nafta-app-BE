import GasCompany from '../models/gasCompany.js';

export const getAllGasCompanies = (req, res, next) => {
    try {
        GasCompany.find()
            .then(gc => res.send(gc))
            .catch(next)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}