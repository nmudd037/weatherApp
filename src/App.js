import './styles/main.scss';

import { Fragment } from 'react';

import Footer from './components/Footer/Footer';
import Hero from './components/Hero/Hero';
import AlertState from './context/Alert/AlertState';
import WeatherState from './context/Weather/WeatherState';

const App = () => {
  return (
    <Fragment>
      <WeatherState>
        <AlertState>
          <Hero />
          <Footer />
        </AlertState>
      </WeatherState>
    </Fragment>
  );
};

export default App;
