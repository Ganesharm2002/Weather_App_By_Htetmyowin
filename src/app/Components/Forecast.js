const Forecast = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {data.map((day, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 text-center"
        >
          <p className="text-xl font-semibold text-blue-700">
            {new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </p>
          <p className="text-lg">🌡️ {day.main.temp}°C</p>
          <p>☁️ {day.weather[0].description}</p>
          <p>💧 Humidity: {day.main.humidity}%</p>
        </div>
      ))}
    </div>
  );
};
export default Forecast;