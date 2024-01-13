import '../../pages/weather/WeatherPage.css'
import { Autocomplete, CssVarsProvider } from "@mui/joy";
import { loadFutureWeather, loadPresentWeather } from "../../store/weather.js";
import { useState } from "react";
import { format, getISODay } from "date-fns";
import { weekdayFormatted } from "../../helpers/date.helper.js";
import { CITIES_LIST } from "../../consts/weatherValues.js"

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState(null)
  const [futureWeather, setFutureWeather] = useState(null)
  const [isLoading, setLoading] = useState(false)
  function loadWeather(city) {
    setLoading(true)
    Promise.all([
      loadPresentWeather(city).then((response) => {
        setWeatherData(weatherData => ({...response.data}))
      }),
      loadFutureWeather(city).then((response) => {
        setFutureWeather(futureWeather => ({...response.data}))
      })
    ])
      .finally(() => {
        setTimeout(() => {
          setLoading(false)
        }, 3000)
      })
  }

  return (
    <div className='weather-page'>
      <h2>Simple weather widget</h2>

      <section className="cities-list-content">
        <CssVarsProvider defaultMode="dark">
          <Autocomplete
            variant="plain"
            placeholder="Select city"
            id="cities-list"
            options={CITIES_LIST}
            onSelect={(event) => {
              if (!!event.target.value) {
                loadWeather(`${event.target.value}`)
              } else {
                setWeatherData(null)
                setFutureWeather(null)
              }
            }}
          />
        </CssVarsProvider>
      </section>

      {weatherData && !isLoading ? (
        <section className="weather-content">
            <span
              className={
                `${weatherData.current.is_day === 0 ? 'night-' : 'day-'}` +
                `${weatherData.current.condition.icon.split('/')[6].split('.')[0]} ` +
                'weather-icon ' +
                `weather-icon_${weatherData.current.is_day === 0 ? 'night' : 'day'}`
              }
            />
          <section className={`weather-card weather-card_${weatherData.current.is_day === 0 ? 'night' : 'day'}`}>
            <h3>{weatherData.location.name}, {weatherData.location.country}</h3>

            <time dateTime={weatherData.location.localtime}>
              {format(weatherData.location.localtime, 'dd.MM.yyyy HH:mm')}
            </time>

            <div className='weather-card--info'>
              <div>
                <p>{weatherData.current.temp_c}°C</p>
                <p>feels like: {weatherData.current.feelslike_c}°C</p>
                <p>{weatherData.current.condition.text}</p>
              </div>
            </div>

            <div className="future-weather">
              {futureWeather.forecast.forecastday.map((item, index) => (
                <div key={index} className="future-weather__card">
                  <h4>{weekdayFormatted(getISODay(item.date))}</h4>
                  <span
                    className={
                      `day-${item.day.condition.icon.split('/')[6].split('.')[0]} ` +
                      'future-weather-icon'
                    }
                  />
                  <div>{item.day.mintemp_c} / {item.day.maxtemp_c}</div>
                </div>
              ))}
            </div>
          </section>
        </section>
      ) : (
        <section className=" weather-card weather-card_loader"/>
      )}
    </div>
  )
}