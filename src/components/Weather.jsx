import React, { useEffect, useState, useRef } from "react";
import "./Weather.css";
import searchh from "../assets/search-icon.png";
import rain from "../assets/rain.png";
import drizzle from "../assets/drizzle.png";
import snow from "../assets/snow.png";
import wind from "../assets/wind.png";
import humidity1 from "../assets/humidity1.png";
import cloud from "../assets/cloud.png";

import sun from "../assets/sun.png";

function Weather() {
  const inputRef = useRef();

  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": sun,
    "01n": sun,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("please Enter City Name");
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;

      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      console.log(data);
      const icon = allIcons[data.weather[0].icon] || sun;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        tempreature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.log("Enter in fetching weather data");
    }
  };

  useEffect(() => {
    search("London");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search" />
        <img
          className="search_icon"
          src={searchh}
          alt=""
          onClick={() => search(inputRef.current.value)}
        />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="" className="weather-icon" />
          <p className="tempreature">{weatherData.tempreature}°</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img className="humidity_icon" src={humidity1} alt="" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img className="wind_icon" src={wind} alt="" />
              <div>
                <p>{weatherData.windSpeed}km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Weather;
