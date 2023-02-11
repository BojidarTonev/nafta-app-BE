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

export const getGasCompanyById = async (req, res, next) => {
    const {id} = req.params;

    try {
        const gasCompany = await GasCompany.findById(id).populate('gasStations').catch(next)
        res.send(gasCompany);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
}

// export const getGasCompanyGasStations = async (req, res, next) => {
//     const {id} = req.params;
//     const gasCompanyGasStations = [];
//
//     try {
//         const gasCompany = await GasCompany.findById(id);
//         for (const gsId of gasCompany.gasStations) {
//             const gasStation = await GasStation.findById(gsId);
//             gasCompanyGasStations.push(gasStation);
//         }
//         res.send(gasCompanyGasStations);
//     } catch (err) {
//         res.status(500).json({message: err.message});
//     }
// }

