import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [weather, setWeather] = useState(null);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=Tours`)
      .then((data) => {
        setWeather(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const weatherInput = (e) => {
    setInput(e.target.value);
  }

  const searchWeather = () => {
    axios.get(`http://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHER_API}&q=${input}`)
    .then(data => {
      setWeather(data.data);
    });
  }

  return (
    <div className="App">
      {weather && (
        <div>
          <div className="search">
            <input onChange={weatherInput} type="text" />
            <button onClick={searchWeather} >Search</button>
          </div>
          <div className="weather-info">
            <h1>{weather.location.name} ({weather.location.region})</h1>
            <small>{weather.location.localtime}</small>
            <div className="condition">
              <h3>{weather.current.condition.text}</h3>
              <img src={weather.current.condition.icon} alt={weather.current.condition.text} />
              <h3>{weather.current.temp_c} °C</h3>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
