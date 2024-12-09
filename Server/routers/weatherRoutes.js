import express from 'express';
import { getWeather, getWeatherReport } from '../controllers/weatherController..js';
const router = express.Router();
import authMiddleware from '../middlewares/authmiddleware.js';

router.get('/current',authMiddleware, getWeather);


// Fetch a report of all weather searches (admin or authenticated route)
router.get('/report',authMiddleware, getWeatherReport);

export default router;
