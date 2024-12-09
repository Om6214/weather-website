import React, { useState } from "react";
import Cookies from "js-cookie"; // Import js-cookie

const Checkweather = () => {
  const [city, setCity] = useState(""); // State to store the city entered by the user
  const [weatherData, setWeatherData] = useState(null); // State to store fetched weather data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Function to fetch weather data based on the entered city
  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    try {
      const token = Cookies.get("authToken"); // Get the token from the cookie

      if (!token) {
        setError("User is not authenticated.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/weather/current?city=${city}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // Add token to Authorization header
          },
        }
      );

      const data = await response.json();
      console.log(data);

      // Check if the response is successful and contains weather data
      if (data && data.success === false) {
        setError("City not found");
        setWeatherData(null);
      } else {
        setWeatherData({
          temperature: data.temperature,
          windSpeed: data.windSpeed,
          humidity: data.humidity,
          rain: data.rain_percent,
          description: data.description,
          iconUrl: data.weatherIcon[0], // Assuming the API returns the icon URL
        });
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="card bg-blue-200 p-6 w-full sm:w-96 shadow-xl rounded-lg">
        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter city name"
            className="input input-bordered w-full"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            className="btn btn-primary w-full mt-2 flex justify-center items-center"
            onClick={fetchWeather}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner text-error"></span>
            ) : (
              "Search"
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* Weather Info */}
        {weatherData && (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold text-gray-800">
              {weatherData.city}
            </h2>
            <img
              src={weatherData.iconUrl}
              alt="Weather icon"
              className="w-24 h-24 my-4"
            />
            <p className="text-xl text-gray-700">{weatherData.description}</p>
            <div className="mt-6 grid grid-cols-2 gap-4 text-gray-800">
              <div className="flex flex-col items-center">
                <p className="font-semibold">Temperature</p>
                <p className="text-xl">{weatherData.temperature}°C</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Wind Speed</p>
                <p className="text-xl">{weatherData.windSpeed} km/h</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Humidity</p>
                <p className="text-xl">{weatherData.humidity}%</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-semibold">Rain</p>
                <p className="text-xl">{weatherData.rain}%</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkweather;
