import { format, getISODay } from "date-fns";
import React from "react";

import { weekdayFormatted } from "../helpers/date.helper.js";

export default function WeatherCard({ weatherData, futureWeather, isLoading }) {
  return (
    <section>
      {weatherData && !isLoading ? (
        <div className="weather-content">
          <span
            className={
              `${weatherData.current.is_day === 0 ? "night-" : "day-"}` +
              `${weatherData.current.condition.icon.split("/")[6].split(".")[0]} ` +
              "weather-icon " +
              `weather-icon_${weatherData.current.is_day === 0 ? "night" : "day"}`
            }
          />
          <section
            className={`weather-card weather-card_${weatherData.current.is_day === 0 ? "night" : "day"}`}
          >
            <h3>
              {weatherData.location.name}, {weatherData.location.country}
            </h3>

            <time dateTime={weatherData.location.localtime}>
              {format(weatherData.location.localtime, "dd MMMM HH:mm")}
            </time>

            <div className="weather-card__info">
              <div>
                <p>
                  {Math.round(weatherData.current.temp_c)}°C{" "}
                  {weatherData.current.condition.text}
                </p>
                <p>
                  feels like {Math.round(weatherData.current.feelslike_c)}°C
                </p>
              </div>
            </div>

            <div className="future-weather">
              {futureWeather.forecast.forecastday.map((item, index) => (
                <div key={index} className="future-weather__card">
                  <h4>{weekdayFormatted(getISODay(item.date))}</h4>
                  <span
                    className={
                      `day-${item.day.condition.icon.split("/")[6].split(".")[0]} ` +
                      "future-weather-icon"
                    }
                  />

                  <div className="future-weather__weather-line">
                    <p>
                      <span className="icon-arrow-top" />{" "}
                      {Math.round(item.day.mintemp_c)}
                    </p>
                    <p>
                      <span className="icon-arrow-bottom" />{" "}
                      {Math.round(item.day.maxtemp_c)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className=" weather-card weather-card_loader" />
      )}
    </section>
  );
}
