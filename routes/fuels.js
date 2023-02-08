import * as FuelsController from '../controllers/fuels.js';
import express from "express";

const router = express.Router();

router.get('/all', FuelsController.getAllFuels);

export default router;