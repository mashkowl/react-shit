import axios from 'axios'
import { format } from "date-fns";

const API_KEY = 'a43825736d8445c19ed163411240301';
export function loadPresentWeather(city) {
  return axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=yes`)
}

export function loadFutureWeather(city) {
  return axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=3&aqi=no&alerts=no`)
}