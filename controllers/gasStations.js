import GasStation from '../models/gasStation.js';

export const getAllGasStations = (req, res, next) => {
    try {
        GasStation.find()
            .then(gc => res.send(gc))
            .catch(next)
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}