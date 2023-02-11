import * as models from './models/index.js';
// mock imports
import FUELS_JSON from './mocks/fuelMocks.json' assert { type: 'json' };
import GAS_COMPANIES_JSON from './mocks/gasCompaniesMocks.json' assert { type: 'json' };
import GAS_STATIONS_JSON from './mocks/gasStationsMocks.json' assert { type: 'json' };

// create functions
const createFuel = async (fuel) => {
    const docFuel = await models.Fuel.create(fuel)
        .catch((err) => console.log(`\\n>> Error creating Fuel:\\n ${err}`));

    return docFuel;
};

const createGasCompany = async (gasCompany) => {
    const docGasCompany = await models.GasCompany.create(gasCompany)
        .catch((err) => console.log(`\\n>> Error creating Gas Company:\\n ${err}`));

    return docGasCompany;
};

const createGasStation = async (gasCompanyId, gasStation) => {
    const docGasStation = await models.GasStation.create(gasStation)
        .catch((err) =>  console.log(`\\n>> Error creating Gas Station:\\n ${err}`));

    await models.GasCompany.findByIdAndUpdate(gasCompanyId, {
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
    }, { new: true, useFindAndModify: false });

    return docGasStation;
};

// populate functions
const populateFuels = async () => {
    const hasFuelsDataInDb = await models.Fuel.findOne();

    if(!hasFuelsDataInDb) {
        for (const f of FUELS_JSON) {
            await createFuel(f);
        }
        console.log('populated fuels!')
    }
};

const populateGasCompanies = async () => {
    const gasCompanyIds = [];
    const hasGasCompaniesDataInDb = await models.GasCompany.findOne();

    if(!hasGasCompaniesDataInDb) {
        for(const gc of GAS_COMPANIES_JSON) {
            const gasCompany = await createGasCompany(gc);
            gasCompanyIds.push(gasCompany._id);
        }
        console.log('populated gas companies!')
    }

    return gasCompanyIds;
};

const populateGasStations = async (gasCompanyIds) => {
    const hasGasStationsDataInDb = await models.GasStation.findOne();

    if(!hasGasStationsDataInDb) {
        for(const gs of GAS_STATIONS_JSON) {
            const randomIndex = Math.floor(Math.random()*GAS_STATIONS_JSON.length) === 0 ?
                Math.floor(Math.random()*GAS_STATIONS_JSON.length) + 1 :
                Math.floor(Math.random()*GAS_STATIONS_JSON.length);

            await createGasStation(gasCompanyIds[randomIndex], gs);
        }
        console.log('populated gas stations!')
    }
}

export const populateDatabaseFunction = async () => {
    await populateFuels();
    const gasCompanyIds = await populateGasCompanies();
    await populateGasStations(gasCompanyIds);
}
