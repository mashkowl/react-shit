import './weather-page.css'
import { LoadCitiesList } from "../../store/weather.js";

export default function WeatherPage() {

  function submitForm(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const data = [...formData.entries()];
    const asString = data
      .map(x => `${encodeURIComponent(x[0])}=${encodeURIComponent(x[1])}`)
      .join('&');
    LoadCitiesList(asString).then((response) => {
      console.log(response.data)
    })
  }

  return (
    <div className='weather-page'>
      <h2>Simple weather widget</h2>

      <form method="post" onSubmit={submitForm}>
        <input type="text" name="q"/>

        <button>Search</button>
      </form>
    </div>
  )
}