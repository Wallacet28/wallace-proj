import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Conselheiro Lafaiete");
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [weatherAlerts, setWeatherAlerts] = useState([]);
  const [locationInfo, setLocationInfo] = useState(null);
  const [airQuality, setAirQuality] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=62263d79fdc049608e801622232708&q=${city}&lang=pt&days=1&aqi=yes`)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        setWeatherForecast(data);
        if (data.alerts && data.alerts.alert) {
          setWeatherAlerts(data.alerts.alert);
        } else {
          setWeatherAlerts([]);
        }
        setLocationInfo(data.location);
        setAirQuality(data.current.air_quality);
      });
  };

  useEffect(() => {
    handleSearch();
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-6">
        <a className="navbar-brand text-white" href="#top">
          Previsão do Tempo
        </a>
      </nav>
      <main className="container">
        <div className="jumbotron">
          <h1>Verifique a previsão da sua cidade</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo para realizar sua pesquisa
          </p>

          <div className="row mb-4">
            <div className="col-md-6">
              <input
                onChange={handleChange}
                className="form-control"
                value={city}
              />
            </div>
          </div>
          <div className="mb-4">
            <button onClick={handleSearch} className="btn btn-primary btn-lg">
              Pesquisar
            </button>
            {weatherForecast ? (
              <div>
                <div className="mt-4 d-flex align-items-center">
                  <div>
                    <img src={weatherForecast.current.condition.icon} alt="Weather Icon" />
                  </div>
                  <div>
                    <h3>Hoje o tempo está: {weatherForecast.current.condition.text}</h3>
                    <p>
                      Temperatura: {weatherForecast.current.temp_c}°C
                    </p>
                    <p>
                      Sensação Térmica: {weatherForecast.current.feelslike_c}°C
                    </p>
                    <p>
                      Velocidade do Vento: {weatherForecast.current.wind_kph} km/h
                    </p>
                    {locationInfo && (
                      <p>
                        Localização: {locationInfo.name}, {locationInfo.region}, {locationInfo.country}
                      </p>
                    )}
                    {airQuality && (
                      <div>
                        <p>Qualidade do Ar:</p>
                        <p>CO: {airQuality.co} μg/m³</p>
                        <p>O3: {airQuality.o3} μg/m³</p>
                        <p>NO2: {airQuality.no2} μg/m³</p>
                        <p>SO2: {airQuality.so2} μg/m³</p>
                        <p>PM2.5: {airQuality.pm2_5} μg/m³</p>
                        <p>PM10: {airQuality.pm10} μg/m³</p>
                        <p>Índice EPA: {airQuality.us_epa}</p>
                        <p>Índice GB DEFRA: {airQuality.gb_defra}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : null}
            {weatherAlerts.length > 0 ? (
              <div className="mt-4">
                <h4>Alertas Meteorológicos:</h4>
                <ul>
                  {weatherAlerts.map((alert, index) => (
                    <li key={index}>
                      <strong>{alert.event}</strong> - {alert.description}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {weatherForecast && weatherForecast.forecast.forecastday[0] ? (
              <div className="mt-4">
                <h4>Previsão para o Dia:</h4>
                <p>Data: {weatherForecast.forecast.forecastday[0].date}</p>
                <p>Temperatura Máxima: {weatherForecast.forecast.forecastday[0].day.maxtemp_c}°C</p>
                <p>Temperatura Mínima: {weatherForecast.forecast.forecastday[0].day.mintemp_c}°C</p>
                <p>Velocidade Máxima do Vento: {weatherForecast.forecast.forecastday[0].day.maxwind_kph} km/h</p>
                <p>Precipitação Total: {weatherForecast.forecast.forecastday[0].day.totalprecip_mm} mm</p>
                <p>Condições Meteorológicas: {weatherForecast.forecast.forecastday[0].day.condition.text}</p>
              </div>
            ) : null}
            {weatherForecast && weatherForecast.forecast.forecastday[0].astro ? (
              <div className="mt-4">
                <h4>Dados Astrológicos:</h4>
                <p>Nascer do Sol: {weatherForecast.forecast.forecastday[0].astro.sunrise}</p>
                <p>Pôr do Sol: {weatherForecast.forecast.forecastday[0].astro.sunset}</p>
                <p>Nascer da Lua: {weatherForecast.forecast.forecastday[0].astro.moonrise}</p>
                <p>Pôr da Lua: {weatherForecast.forecast.forecastday[0].astro.moonset}</p>
                <p>Fase da Lua: {weatherForecast.forecast.forecastday[0].astro.moon_phase}</p>
                <p>Iluminação da Lua: {weatherForecast.forecast.forecastday[0].astro.moon_illumination}</p>
              </div>
            ) : null}
            {weatherForecast && weatherForecast.forecast.forecastday[0].hour ? (
              <div className="mt-4">
                <h4>Previsão por Hora:</h4>
                <ul>
                  {weatherForecast.forecast.forecastday[0].hour.map((hour, index) => (
                    <li key={index}>
                      <p>Hora: {hour.time}</p>
                      <p>Temperatura: {hour.temp_c}°C</p>
                      <p>Condição: {hour.condition.text}</p>
                      <p>Velocidade do Vento: {hour.wind_kph} km/h</p>
                      <p>Pressão: {hour.pressure_mb} mb</p>
                      <p>Umidade: {hour.humidity}%</p>
                      <p>Nuvens: {hour.cloud}%</p>
                      <p>Sensação Térmica: {hour.feelslike_c}°C</p>
                      <p>Índice UV: {hour.uv}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;


