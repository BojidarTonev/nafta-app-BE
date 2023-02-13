import * as GasCompanies from '../controllers/gasCompanies.js';
import express from "express";

const router = express.Router();

router.get('/all', GasCompanies.getAllGasCompanies);
router.get('/details/:id', GasCompanies.getGasCompanyById);
router.get('/by-fuel/:name', GasCompanies.getCompaniesByFuelName);

export default router;