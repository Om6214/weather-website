import axios from 'axios';
import db from '../config/conn.js';  // Use the exported db connection

const WEATHERSTACK_API_KEY = process.env.WEATHERSTACK_API_KEY;  // Replace with your WeatherStack API key

// Fetch current weather data for a city
export async function getWeather(req, res) {
    const { city } = req.query;

    if (!city) {
        return res.status(400).json({ message: 'City is required' });
    }

    try {
        // Call the WeatherStack API
        const response = await axios.get(`http://api.weatherstack.com/current`, {
            params: {
                access_key: WEATHERSTACK_API_KEY,
                query: city
            }
        });

        // Save the weather search history in the database
        const userId = req.user.id; // Assuming user is attached to the request by auth middleware
        const username = req.user.username
        const weatherData = response.data;
        await db.promise().query("INSERT INTO weather_searches (user_id ,username, city, weather_data) VALUES (?,?, ?, ?)", [
            userId,
            username,
            city,
            JSON.stringify(weatherData)
        ]);

        res.json({
            city:weatherData.current.City,
            temperature: weatherData.current.temperature,
            description: weatherData.current.weather_descriptions[0],
            windSpeed: weatherData.current.wind_speed,
            windDegree: weatherData.current.wind_degree,
            weatherIcon: weatherData.current.weather_icons,
            humidity: weatherData.current.humidity
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data',error });
    }
}



// Fetch a report of all weather searches (admin or authenticated)
export async function getWeatherReport(req, res) {
    try {
        // Assuming you want the report for all users (could be limited to admin only)
        const [searches] = await db.promise().query("SELECT * FROM weather_searches");
        res.json(searches);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather search report' });
    }
}
