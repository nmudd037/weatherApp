import { useWeather } from '../../context/Weather/WeatherState';
import WeatherItem from '../WeatherItem/WeatherItem';

const WeatherCard = () => {
  // Custom Hooks for Weather State
  const weatherState = useWeather()[0];
  const { currentWeather, forecastWeather, city, country, timezone } = weatherState;

  return (
    <div className="columns mt-3 is-multiline" id="weatherCard">
      <div className="column is-12 has-text-centered">
        <h1 className="subtitle">
          {city}, {country} Weather <i className="fad fa-sun-cloud coral"></i> Forecast
        </h1>
      </div>
      {currentWeather && <WeatherItem weather={currentWeather} timezone={timezone} />}
      {forecastWeather &&
        forecastWeather.map((data, i) => (
          <WeatherItem weather={data} key={i} timezone={timezone} />
        ))}
    </div>
  );
};

export default WeatherCard;
