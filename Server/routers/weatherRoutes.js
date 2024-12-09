import express from 'express';
import { getWeather, getWeatherReport } from '../controllers/weatherController..js';
const router = express.Router();
import authMiddleware from '../middlewares/authmiddleware.js';

router.get('/current',authMiddleware, getWeather);


router.get('/report',authMiddleware, getWeatherReport);

export default router;
