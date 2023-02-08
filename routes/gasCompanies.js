import * as GasCompanies from '../controllers/gasCompanies.js';
import express from "express";

const router = express.Router();

router.get('/all', GasCompanies.getAllGasCompanies);

export default router;