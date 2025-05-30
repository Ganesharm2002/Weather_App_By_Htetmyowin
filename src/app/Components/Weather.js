"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { useCity } from "../context/CityContext";


const Weather = () => {
  const { city, setCity } = useCity();
  const [weatherdata, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  const API_Key = "b2d78f93c2f7731161fd1484532afe23";

  const getWeather = async () => {
    if (!city.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}&units=metric`
      );
      setWeatherData(response.data);
    } catch {
      setWeatherData(null);
      setError("City not found");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-300 min-h-screen flex flex-col items-center justify-center">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500 font-semibold text-xl">{error}</p>}

      <h2 className="text-center mb-20">
        Weather App by{" "}
        <span className="text-2xl font-bold text-amber-500">Htet Myo Win</span>
      </h2>

      <div className="p-5 flex justify-center items-center gap-4">
        <input
          ref={inputRef}
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e)=>{
         if(e.key === "Enter") getWeather();
        }}
          className="bg-gray-300 rounded-lg px-3 py-3 text-lg text-amber-900 outline-none shadow-lg"
        />

        <button 
          onClick={getWeather}
          className="bg-amber-500 text-white px-5 py-3 rounded-md font-semibold hover:bg-amber-600 transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </div>

      {weatherdata?.main && weatherdata?.weather && (
        <div className="animate-fadeIn mt-6 bg-blue-100 text-blue-900 font-medium text-lg px-20 py-10 rounded-lg shadow-md">
          <ul className="text-gray-700">
            <li>🌆 City: {weatherdata.name}</li>
            <li>🌡️ Temp: {weatherdata.main.temp}°C</li>
            <li>☁️ Weather: {weatherdata.weather[0].description}</li>
            <li>💧Humidity: {weatherdata.main.humidity}%</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Weather;
