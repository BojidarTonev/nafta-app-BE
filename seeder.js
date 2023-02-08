import * as models from './models/index.js';
// mock imports
import FUELS_JSON from './mocks/fuelMocks.json' assert { type: 'json' };
import GAS_COMPANIES_JSON from './mocks/gasCompaniesMocks.json' assert { type: 'json' };
import GAS_STATIONS_JSON from './mocks/gasStationsMocks.json' assert { type: 'json' };

const gasCompanyIds = [];

// create functions
const createFuel = (fuel) => {
    return models.Fuel.create(fuel)
        .then((docFuel) => {
            console.log('\\n>> Created Fuel:\\n', docFuel);
            return docFuel;
        })
        .catch((err) => {
            throw new Error(`\\n>> Error creating Fuel:\\n ${err}`);
        })
};

const createGasCompany = (gasCompany) => {
    return models.GasCompany.create(gasCompany)
        .then((docGasCompany) => {
            console.log('\\n>> Created Gas Company:\\n', docGasCompany);
            return docGasCompany;
        })
        .catch((err) => {
            throw new Error(`\\n>> Error creating Gas Company:\\n ${err}`);
        })
};

const createGasStation = (gasCompanyId, gasStation) => {
    return models.GasStation.create(gasStation)
        .then((docGasStation) => {
            console.log('\\n>> Created Gas Station:\\n', docGasStation);
            return models.GasCompany.findByIdAndUpdate(
                gasCompanyId,
                {
                    $push: {
                        gasStations: {
                            _id: docGasStation._id,
                            name: docGasStation.name,
                            phoneNumber: docGasStation.phoneNumber,
                            location: docGasStation.location,
                            lat: docGasStation.lat,
                            len: docGasStation.len,
                            availableFuels: docGasStation.availableFuels
                        }
                    }
                },
                { new: true, useFindAndModify: false }
            )
        })
        .catch((err) => {
            throw new Error(`\\n>> Error creating Gas Station:\\n ${err}`);
        })
};

// populate functions
const populateFuels = () => {
    return new Promise((resolve, reject) => {
        models.Fuel.findOne().then( (res) => {
            if(!res) {
                for (const f of FUELS_JSON) {
                    createFuel(f)
                        .catch((err) => reject(err));
                }
                resolve();
            }
            resolve();
        })
    })
};

const populateGasCompanies = () => {
    return new Promise((resolve, reject) => {
        models.GasCompany.findOne().then((res) => {
            if(!res) {
                for(const gc of GAS_COMPANIES_JSON) {
                    createGasCompany(gc)
                        .then((gasCompany) => {
                            gasCompanyIds.push(gasCompany._id);
                        })
                        .catch((err) => reject(err));
                }
                resolve();
            }
            resolve();
        })
    })
};

const populateGasStations = () => {
    return new Promise((resolve, reject) => {
        models.GasStation.findOne().then( (res) => {
            if(!res) {
                for(const gs of GAS_STATIONS_JSON) {
                    createGasStation(gasCompanyIds[Math.floor(Math.random()*GAS_STATIONS_JSON.length)], gs)
                        .catch((err) => reject(err));;
                }
                resolve();
            }
            resolve();
        })
    })
}

export const populateDatabaseFunction = () => {
    return Promise.all([populateFuels(), populateGasCompanies(), populateGasStations()])
        .then(() => console.log('Database successfully seeded with mock data!!!'))
        .catch(() => new Error('seeding of db failed with error'));
}
