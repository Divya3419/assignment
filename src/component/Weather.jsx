import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "./Weather.module.css";
const Weather = () => {
  const [data, setData] = useState("Ho Chi Minh");
  const [select, setSelect] = useState([]);

  const handleChange = (e) => {
    setData(e.target.value);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${data}&cnt=4&units=metric&appid=847d75de4265051f3b09b1b6a2474c30`
      )
      .then((r) => {
        setSelect(r.data.list);
      })

      .catch((e) => console.log(e));
  }, [data]);
  console.log(select);

  return (
    <>
      <div className={styles.container}>
      <div >
        <select className={styles.select} onChange={handleChange}>
          <option value="Ho Chi Minh">Ho Chi Minh</option>
          <option value="Singapore">Singapore</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Tokyo">Tokyo</option>
          <option value="Athens">Athens</option>
        </select>
      </div>
      <div className={styles.heading}>
      <h2>Current Weather:</h2>
      <h2>Next 3 days</h2>
      </div>
      <div className={styles.days}>
        {select?.map((ele, index) => {
          if (index == 0) {
            return (
              <div key={ele.dt}>
                <p>{ele.main.temp}°C</p>
              </div>
            );
          }
          return (
            <div key={ele.dt}>
              <p>{ele.dt_txt}</p>
              <p>{ele.main.temp}°C</p>
            </div>
          );
        })}
      </div>
      </div>
    </>
  );
};

export default Weather;
