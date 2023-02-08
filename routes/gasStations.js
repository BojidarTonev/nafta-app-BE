import * as GasStations from '../controllers/gasStations.js';
import express from "express";

const router = express.Router();

router.get('/all', GasStations.getAllGasStations);

export default router;