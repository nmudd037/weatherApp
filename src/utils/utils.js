// Mapping Openweathermap api data to our needs
export const mapDataToWeatherInterface = (data) => {
  const mapData = {
    date: data.dt * 1000, // convert from seconds to milliseconds
    temperature: Math.round(data.main.temp),
    icon_id: data.weather[0].id,
    icon: data.weather[0].icon,
    description: data.weather[0].description,
  };

  if (data.name && data.sys.country && data.timezone) {
    mapData.city = data.name;
    mapData.country = data.sys.country;
    mapData.timezone = data.timezone / 3600; // convert from seconds to hours
  }

  return mapData;
};

// Helper Function
export const sleep = (min) => {
  return new Promise((resolve) => setTimeout(resolve, min * 60000));
};
