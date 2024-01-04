import '../../pages/weather/WeatherPage.css'
// import { LoadCitiesList } from "../../store/weather.js";
import { Button, ButtonGroup, Paper } from "@mui/material";
import { loadCurrentWeather } from "../../store/weather.js";
import { useState } from "react";
import { format } from "date-fns";

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)
  function loadWeather(city) {
    loadCurrentWeather(city).then((response) => {
      setWeatherData(weatherData => ({...response.data}))
      }
    )
  }

  return (
    <div className='weather-page'>
      <h2>Simple weather widget</h2>

      <ButtonGroup className="buttons" size="large" color="secondary" variant="text" aria-label="large secondary button group">
        <Button onClick={() => loadWeather('London')}>London</Button>
        <Button onClick={() => loadWeather('Shanghai')}>Shanghai</Button>
        <Button onClick={() => loadWeather('Moscow')}>Moscow</Button>
      </ButtonGroup>

      {weatherData && (
        <section  className="weather-card">
          <h3>{weatherData.location.name}, {weatherData.location.country}</h3>

          <time dateTime={weatherData.location.localtime}>
            {format(weatherData.location.localtime, 'dd.MM.yyyy H:mm')}
          </time>

          <div className='weather-card--info'>
            <span
              className={`${weatherData.current.is_day === 0 ? 'night-' : 'day-'}${weatherData.current.condition.icon.split('/')[6].split('.')[0]} weather-icon`}></span>
            <p>{weatherData.current.temp_c}°C</p>
            <p>{weatherData.current.condition.text}</p>
          </div>

        </section>
      )}
    </div>
  )
}