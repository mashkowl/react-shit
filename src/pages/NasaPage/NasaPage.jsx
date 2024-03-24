import "./NasaPage.scss";

import { format } from "date-fns";
import React, { useEffect, useState } from "react";

import { loadPictureOfDay } from "../../store/nasa.js";

function NasaPage() {
  const [dataOfDate, setDataOfDate] = useState({});

  function getPictureOfDay() {
    loadPictureOfDay({ date: format(new Date(), "yyyy-MM-dd") }).then(
      (response) => {
        setDataOfDate(() => ({ ...response.data }));
      },
    );
  }

  useEffect(() => {
    getPictureOfDay();
  }, []);

  useEffect(() => {
    document.getElementById("detail").style.backgroundImage =
      `url(${dataOfDate.hdurl})`;
  }, [dataOfDate]);

  return (
    <div className="nasa-page">
      <header>
        <h1>{dataOfDate.title}</h1>
        <p>{dataOfDate.explanation}</p>
      </header>
    </div>
  );
}

export default NasaPage;
