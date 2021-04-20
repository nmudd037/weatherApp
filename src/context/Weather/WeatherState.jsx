import axios from 'axios';
import { useContext, useReducer } from 'react';

import { mapDataToWeatherInterface } from '../../utils/utils';
import {
  CLEAR_ERROR,
  CLEAR_WEATHER,
  GET_CURRENT_WEATHER,
  GET_FORECAST_WEATHER,
  SET_ERROR,
  SET_LOADING,
} from '../types';
import WeatherContext from './WeatherContext';
import WeatherReducer from './WeatherReducer';

// Create a custom hook to use the Weather context
export const useWeather = () => {
  const { state, dispatch } = useContext(WeatherContext);
  return [state, dispatch];
};

let apiKey =
  process.env.NODE_ENV === 'production'
    ? process.env.OPENWEATHERMAP_API_KEY
    : process.env.REACT_APP_OPENWEATHERMAP_API_KEY;

// Action creators

// Get Current Weather
export const getCurrentWeather = async (dispatch, location) => {
  try {
    setLoading(dispatch);

    console.log(apiKey, process.env.NODE_ENV);
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location.city}&units=metric&appid=${apiKey}`
    );

    if (res.data.cod === '404' || res.data.cod === '401') {
      return dispatch({ type: SET_ERROR, payload: res.data });
    }

    dispatch({ type: GET_CURRENT_WEATHER, payload: mapDataToWeatherInterface(res.data) });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response.data });
  }
};

// Get Forecast Weather
export const getForecastWeather = async (dispatch, location) => {
  try {
    setLoading(dispatch);

    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${location.city}&units=metric&appid=${apiKey}`
    );

    // if (res.data.cod === '404' || res.data.cod === '401') {
    //   return dispatch({ type: SET_ERROR, payload: res.data });
    // }

    //Since API gives data for 5 days / 3 hours we only select one time for each day to display weather
    const foreCastData = res.data.list
      .filter((data) => data.dt_txt.match(/12:00:00/))
      .map((data) => mapDataToWeatherInterface(data));

    dispatch({ type: GET_FORECAST_WEATHER, payload: foreCastData });
  } catch (err) {
    dispatch({ type: SET_ERROR, payload: err.response.data });
  }
};

// Clear Weather
export const clearWeather = (dispatch) => {
  dispatch({ type: CLEAR_WEATHER });
};

// Clear Weather Error
export const clearError = (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
};

// Set Loading - Optional could be used to load spinners
export const setLoading = (dispatch) => dispatch({ type: SET_LOADING });

const WeatherState = (props) => {
  const initialState = {
    currentWeather: null,
    forecastWeather: null,
    city: null,
    country: null,
    timezone: null,
    isLoading: false,
    error: null,
    isWeather: null,
  };

  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  return (
    <WeatherContext.Provider
      value={{
        state: state,
        dispatch,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherState;
