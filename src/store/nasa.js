import axios from "axios";

const API_KEY = "fIicAHFcpF3V6dC0og2aHmcW5DZY8IZJPo542TP9";

export function loadPictureOfDay(payload) {
  payload.api_key = API_KEY;
  return axios.get("https://api.nasa.gov/planetary/apod", {
    params: payload,
  });
}
