"use client";
import axios from "axios";
import { useState, useEffect } from "react";

import { useCity } from "../context/CityContext";
import Forecast from "../Components/Forecast";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateBack } from "@fortawesome/free-solid-svg-icons";


const WeatherForecast = () => {
  const { city } = useCity();
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_Key = "b2d78f93c2f7731161fd1484532afe23";

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_Key}&units=metric`
      );
      const filtered = forecastResponse.data.list.filter((forecast) =>
        forecast.dt_txt.includes("12:00:00")
      );
      setForecastData(filtered);
    } catch {
      setError("Couldn't fetch forecast data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, [city]);

  return (
    <div className="bg-gradient-to-bl from-blue-100 to-blue-400 min-h-screen flex flex-col items-center justify-center">
       <Link
        href="/"
         title="Back to Home"
        className="self-start mb-4 ms-2 rounded-lg  bg-white text-blue-600 px-4 py-2  shadow hover:bg-blue-50 transition"
      >
        <FontAwesomeIcon className="text-blue-400 hover:scale-3d text-[1.2rem] "  icon={faRotateBack}/>
      </Link>
      {loading && <p className="text-lg text-teal-500">Loading forecast...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && forecastData.length > 0 && (
        <Forecast data={forecastData} />
      )}
       
    </div>
  );
};

export default WeatherForecast;
