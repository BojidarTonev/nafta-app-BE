import routers from '../routes/index.js';

export default (app) => {
    app.use('/fuels', routers.FuelsRouter);
    app.use('/gas-companies', routers.GasCompaniesRouter);
    app.use('/gas-stations', routers.GasStationsRouter);

    app.use('*', (req, res, next) => res.send('<h1>Something went wrong. Try again! :thumbsup: </h1>'))
}