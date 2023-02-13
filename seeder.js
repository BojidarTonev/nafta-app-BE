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

const createGasStation = async (gasCompany, fuels,  gasStation) => {
    const { availableFuels } = gasStation;

    const fuelValues = availableFuels.map((fuel) => {
        const randomFuelIndex = Math.floor(Math.random()*fuels.length);
        return { ...fuel, fuelName: fuels[randomFuelIndex].name}
    });

    const docGasStation = await models.GasStation.create({...gasStation, availableFuels: []})
        .catch((err) =>  console.log(`\\n>> Error creating Gas Station:\\n ${err}`));

    await models.GasCompany.findByIdAndUpdate(gasCompany._id, {
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
    }, { new: true, useFindAndModify: false })
        .catch((err) => console.log('error in updating gas company -> gas stations array', err));

    await models.GasStation.findByIdAndUpdate(docGasStation._id, {
        brandName: gasCompany.name,
        brandImageUrl: gasCompany.imageUrl,
        $push: {
            availableFuels: {
                $each: [...fuelValues]
            }
        }
    }, { new: true, useFindAndModify: false })
        .catch((err) => console.log('error in updating the available fuels field in gas stations => ', err));

    return docGasStation;
};

// populate functions
const populateFuels = async () => {
    const fuels = [];
    const hasFuelsDataInDb = await models.Fuel.findOne();

    if(!hasFuelsDataInDb) {
        for (const f of FUELS_JSON) {
            const fuel = await createFuel(f);
            fuels.push(fuel);
        }
        console.log('populated fuels!')
    }

    return fuels;
};

const populateGasCompanies = async () => {
    const gasCompanies = [];
    const hasGasCompaniesDataInDb = await models.GasCompany.findOne();

    if(!hasGasCompaniesDataInDb) {
        for(const gc of GAS_COMPANIES_JSON) {
            const gasCompany = await createGasCompany(gc);
            gasCompanies.push(gasCompany);
        }
        console.log('populated gas companies!')
    }

    return gasCompanies;
};

const populateGasStations = async (gasCompanies, fuels) => {
    const hasGasStationsDataInDb = await models.GasStation.findOne();

    if(!hasGasStationsDataInDb) {
        for(const gs of GAS_STATIONS_JSON) {
            const randomIndex = Math.floor(Math.random()*GAS_COMPANIES_JSON.length - 1) === 0 ?
                Math.floor(Math.random()*GAS_COMPANIES_JSON.length) + 1 :
                Math.floor(Math.random()*GAS_COMPANIES_JSON.length);

            await createGasStation(gasCompanies[randomIndex], fuels, gs);
        }
        console.log('populated gas stations!')
    }
}

export const populateDatabaseFunction = async () => {
    const fuels = await populateFuels();
    const gasCompanies = await populateGasCompanies();
    await populateGasStations(gasCompanies, fuels);
}
