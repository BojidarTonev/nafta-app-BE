import Fuel from '../models/fuel.js';

export const getAllFuels = (req, res, next) => {
    try {
        Fuel.find()
            .then(fuels => res.send(fuels))
            .catch(next)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}