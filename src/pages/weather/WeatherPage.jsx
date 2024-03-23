import "./WeatherPage.scss";

import { Autocomplete, CssVarsProvider } from "@mui/joy";
import React, { useState } from "react";

import WeatherCard from "../../components/WeatherCard.jsx";
import { CITIES_LIST } from "../../consts/weatherValues.js";
import { loadFutureWeather, loadPresentWeather } from "../../store/weather.js";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null);
  const [futureWeather, setFutureWeather] = useState(null);
  const [isLoading, setLoading] = useState(false);
  function loadWeather(city) {
    setLoading(true);

    Promise.all([
      loadPresentWeather(city).then((response) => {
        setWeatherData(() => ({ ...response.data }));
      }),
      loadFutureWeather(city).then((response) => {
        setFutureWeather(() => ({ ...response.data }));
      }),
    ]).finally(() => {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    });
  }

  return (
    <div className="weather-page">
      <h2>Simple weather widget</h2>

      <section className="cities-list-content">
        <CssVarsProvider defaultMode="dark">
          <Autocomplete
            variant="plain"
            placeholder="Select city"
            id="cities-list"
            options={CITIES_LIST}
            onSelect={(event) => {
              if (event.target.value) {
                loadWeather(`${event.target.value}`);
              } else {
                setWeatherData(null);
                setFutureWeather(null);
              }
            }}
          />
        </CssVarsProvider>
      </section>

      <WeatherCard
        futureWeather={futureWeather}
        weatherData={weatherData}
        isLoading={isLoading}
      />
    </div>
  );
}
