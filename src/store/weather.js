import axios from 'axios'

const API_KEY = 'a43825736d8445c19ed163411240301';
export function loadCurrentWeather(city) {
  return axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`)
}