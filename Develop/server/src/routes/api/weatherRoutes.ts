import { Router, type Request, type Response } from 'express';
const router = Router();

import _HistoryService from '../../service/historyService.js';
import _WeatherService from '../../service/weatherService.js';

router.post('/', async (req: Request, res: Response) => {
  const { city } = req.body; // Extract city name from request body

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    // Get weather data from city name
    const weatherData = await _WeatherService.getWeatherForCity(city);

    // Save city to search history
    await _HistoryService.saveCity(city);

    return res.status(200).json(weatherData);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve weather data' });
  }
});

// GET search history
router.get('/history', async (_req: Request, res: Response) => {
  try {
    const history = await _HistoryService.getSearchHistory();
    return res.status(200).json(history);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to retrieve search history' });
  }
});


// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (_req: Request, _res: Response) => {});

export default router;
