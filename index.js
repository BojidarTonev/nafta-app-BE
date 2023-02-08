import express from 'express';
import {dbConnection} from "./config/database.js";
import {populateDatabaseFunction} from "./seeder.js";
// configuration files
import serverConfig from "./config/config.js";
import expressConfig from './config/express.js';
import routesConfig from './config/routes.js';

dbConnection().then(() => {
    const app = express();

    expressConfig(app);
    routesConfig(app);

    populateDatabaseFunction()
        .catch((err) => console.log('Error seeding database => ', err));

    app.listen(serverConfig.port, () => console.log(`Listening on port ${serverConfig.port}`))
});