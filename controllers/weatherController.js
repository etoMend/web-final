// controllers/weatherController.js
const axios = require('axios');

exports.getWeatherAndPollution = async (req, res, next) => {
    try {
        const city = req.query.city || 'Almaty';
        const apiKey = process.env.WEATHER_API_KEY;

        // 1. Get Coordinates for the city
        const geoUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
        const geoRes = await axios.get(geoUrl);
        
        if (!geoRes.data || geoRes.data.length === 0) {
            return res.status(404).json({ message: "City coordinates not found" });
        }

        const { lat, lon, name } = geoRes.data[0];

        // 2. Get Weather and Air Pollution in parallel (faster performance)
        const [weatherRes, pollutionRes] = await Promise.all([
            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`),
            axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
        ]);

        // 3. Send combined data to frontend
        res.status(200).json({
            city: name,
            temperature: weatherRes.data.main.temp,
            condition: weatherRes.data.weather[0].description,
            icon: weatherRes.data.weather[0].icon,
            air_quality_index: pollutionRes.data.list[0].main.aqi, // 1 to 5
            pollutants: pollutionRes.data.list[0].components
        });

    } catch (err) {
        // Passes error to your Global Error Handler in server.js
        next(err);
    }
};