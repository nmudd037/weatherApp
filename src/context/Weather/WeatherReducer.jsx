import {
  CLEAR_ERROR,
  CLEAR_WEATHER,
  GET_CURRENT_WEATHER,
  GET_FORECAST_WEATHER,
  SET_ERROR,
  SET_LOADING,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case GET_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload,
        city: action.payload.city,
        country: action.payload.country,
        timezone: action.payload.timezone,
        isWeather: true,
      };
    case GET_FORECAST_WEATHER:
      return {
        ...state,
        forecastWeather: action.payload,
      };
    case CLEAR_WEATHER:
      return {
        ...state,
        currentWeather: null,
        forecastWeather: null,
        city: null,
        country: null,
        isWeather: false,
      };
    case CLEAR_ERROR:
      return { ...state, error: null };
    case SET_ERROR:
      return { ...state, error: action.payload.message };
    default:
      throw new Error(`Unsupported type of: ${action.type}`);
  }
};
