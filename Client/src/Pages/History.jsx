import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const History = () => {
  const [searchHistory, setSearchHistory] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchSearchHistory = async () => {
      try {
        const token = Cookies.get("authToken"); // Replace 'authToken' with your cookie's key name

        if (!token) {
          console.error("No token found in cookies");
          return;
        }

        // Make API call with token in the Authorization header
        const response = await axios.get(
          "http://localhost:5000/api/weather/report",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(response.data); // Log the response for debugging

        // Extract and transform relevant data from the API response
        const formattedData = response.data.map((entry) => ({
          User: entry.username || "N/A", // Fallback to "N/A" if username is missing
          City: entry.city || "Unknown",
          Temperature: entry.weather_data?.current?.temperature || "N/A",
          Humidity: entry.weather_data?.current?.humidity || "N/A",
          CreatedAt: entry.created_at || "Unknown Date",
        }));

        setSearchHistory(formattedData);
      } catch (error) {
        console.error("Error fetching weather report:", error);
      } finally {
        setLoading(false); // Stop loading after API call completes
      }
    };

    fetchSearchHistory();
  }, []);

  return (
    <div className="overflow-x-auto mt-6">
      {loading ? (
        // Loading spinner
        <div className="flex justify-center items-center h-full">
          <span className="loading loading-spinner text-primary"></span>
        </div>
      ) : (
        // Table to display search history
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>User</th>
              <th>City</th>
              <th>Temperature (°C)</th>
              <th>Humidity (%)</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {searchHistory.map((entry, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{entry.User}</td>
                <td>{entry.City}</td>
                <td>{entry.Temperature}</td>
                <td>{entry.Humidity}</td>
                <td>{new Date(entry.CreatedAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default History;
