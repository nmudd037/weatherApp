import { useContext, useEffect, useState } from 'react';
import Fade from 'react-reveal';

import AlertContext from '../../context/Alert/AlertContext';
import {
  clearError,
  clearWeather,
  getCurrentWeather,
  getForecastWeather,
  useWeather,
} from '../../context/Weather/WeatherState';
import { sleep } from '../../utils/utils';
import WeatherCard from '../WeatherCard/WeatherCard';

const Hero = () => {
  // Form State
  const initialState = {
    city: '',
  };

  const [location, setLocation] = useState(initialState);
  const { city } = location;

  // Custom Hooks for Weather State
  const [weatherState, weatherDispatch] = useWeather();
  const { isWeather, error } = weatherState;

  // Alert Generator
  const { alertGenerator } = useContext(AlertContext);

  const onChange = (e) => setLocation({ ...location, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    getCurrentWeather(weatherDispatch, location);
    getForecastWeather(weatherDispatch, location);
    setLocation(initialState);
  };

  // Clear Weather after 8 minutes
  useEffect(() => {
    const clear = async () => {
      await sleep(8);
      clearWeather(weatherDispatch);
      setLocation((location) => ({ ...location, city: '' }));
    };

    if (isWeather) {
      clear();
    }
  }, [isWeather, weatherDispatch]);

  // Display Error Messages
  useEffect(() => {
    if (error) {
      alertGenerator('error', error);
      clearError(weatherDispatch);
    }
  }, [alertGenerator, weatherDispatch, error]);

  return (
    <section className="hero is-medium" id="hero">
      <div className="hero-body">
        <div className="container">
          <Fade left duration={1000} delay={500} distance="30px">
            <div className="columns">
              <div className="column is-full">
                <h1 className="title is-1">
                  Get a 5 days Weather Forecast <i className="fad fa-sun-cloud coral"></i> for any
                  city
                </h1>
                <hr className="content-divider" />
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="control">
                <div className="columns">
                  <div className="column is-four-fifths">
                    <input
                      className="input is-hovered"
                      type="text"
                      name="city"
                      id="city"
                      value={city}
                      placeholder="Enter a city name..."
                      onChange={onChange}
                    />
                  </div>
                  <div className="column has-text-centered">
                    <input
                      className="button is-white is-inverted"
                      type="submit"
                      value="Get Forecast &#127774;"
                    />
                  </div>
                </div>
              </div>
            </form>
          </Fade>
          <div id="card">
            {isWeather && (
              <Fade left duration={1000} delay={500} distance="30px">
                <WeatherCard />
              </Fade>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
