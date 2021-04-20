import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import PropTypes from 'prop-types';

dayjs.extend(utc); //use plugin

const WeatherItem = ({ weather, timezone }) => {
  const { date, temperature, icon, description } = weather;

  return (
    <div className="column is-4">
      <div className="notification card">
        <div className="columns is-vcentered is-multiline">
          <div className="column is-full has-text-centered">
            <strong className="fs-2">{dayjs.utc(date).utcOffset(timezone).format('dddd')}</strong>
          </div>

          <div className="column is-full has-text-centered">
            <strong className="fs-1.6">
              {dayjs.utc(date).utcOffset(timezone).format('MMMM, D')}
            </strong>
          </div>

          <div className="column is-full has-text-centered">
            <img
              src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
              alt="Weather"
              width="140"
              height="140"
            />
          </div>

          <div className="column is-full has-text-centered">
            <strong className="fs-2">{temperature} &#8451;</strong>
          </div>

          <div className="column is-full has-text-centered">
            <strong className="fs-1_6 capitalize">{description}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherItem.propTypes = {
  weather: PropTypes.object.isRequired,
  timezone: PropTypes.number.isRequired,
};

export default WeatherItem;
