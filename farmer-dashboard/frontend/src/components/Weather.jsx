import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const fetchWeather = async () => {
        try {
            const apiKey = 'a9d839c2e52641809e352555251903'; // Your WeatherAPI key
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=Nanded&days=1`
            );
            setWeatherData(response.data);
            setError(null);
        } catch (err) {
            setError('Error fetching weather data');
            setWeatherData(null);
        }
    };

    useEffect(() => {
        fetchWeather();
        const interval = setInterval(fetchWeather, 60000); // Fetch weather every minute
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-green-900 mb-4">Weather for Farmers</h2>
            {error && <p className="text-red-500">{error}</p>}
            {weatherData ? (
                <div className="space-y-4">
                    {/* Location and Current Weather */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-green-700 font-semibold text-xl">
                            {weatherData.location.name}, {weatherData.location.country}
                        </p>
                        <div className="flex items-center mt-2">
                            <img
                                src={`https:${weatherData.current.condition.icon}`}
                                alt="Weather Icon"
                                className="w-12 h-12"
                            />
                            <p className="text-green-700 font-semibold text-2xl ml-2">
                                {weatherData.current.temp_c} °C
                            </p>
                        </div>
                        <p className="text-green-700 font-semibold text-lg">
                            {weatherData.current.condition.text}
                        </p>
                    </div>

                    {/* Weather Details */}
                    <div className="grid grid-cols-2 gap-4">
                        {/* Chance of Rain */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-green-700 font-semibold text-lg">Chance of Rain</p>
                            <p className="text-green-700 font-semibold text-2xl">
                                {weatherData.forecast.forecastday[0].day.daily_chance_of_rain}%
                            </p>
                        </div>

                        {/* Humidity */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-green-700 font-semibold text-lg">Humidity</p>
                            <p className="text-green-700 font-semibold text-2xl">
                                {weatherData.current.humidity}%
                            </p>
                        </div>

                        {/* Wind Speed */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-green-700 font-semibold text-lg">Wind Speed</p>
                            <p className="text-green-700 font-semibold text-2xl">
                                {weatherData.current.wind_kph} km/h
                            </p>
                        </div>

                        {/* UV Index */}
                        <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-green-700 font-semibold text-lg">UV Index</p>
                            <p className="text-green-700 font-semibold text-2xl">
                                {weatherData.current.uv}
                            </p>
                        </div>
                    </div>

                    {/* Sunrise and Sunset */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <p className="text-green-700 font-semibold text-lg">Sunrise & Sunset</p>
                        <div className="flex justify-between mt-2">
                            <p className="text-green-700 font-semibold text-xl">
                                🌅 {weatherData.forecast.forecastday[0].astro.sunrise}
                            </p>
                            <p className="text-green-700 font-semibold text-xl">
                                🌇 {weatherData.forecast.forecastday[0].astro.sunset}
                            </p>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-700"></div>
                </div>
            )}
        </div>
    );
};

export default Weather;