import React from 'react';
import Weather from './Components/Weather';
import { citiesList } from './Components/CitiesList';
import Downshift from 'downshift'
import { css, injectGlobal } from 'emotion';


const API_KEY = '2f9bf7dfeb836a758792106fef8a46f7';

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    sunrise: undefined,
    conditions: undefined,
    humidity: undefined,
    pressure: undefined,

    cities: citiesList
  }

  getWeather = async (selection) => {

    const city = selection.value;
    const country = selection.country;

    if (city) {
      const API_URL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}`);
      const data = await API_URL.json();
      let sunrise = data.sys.sunrise;
      let sunset = data.sys.sunset;
      let conditions = data.weather[0]['main'];
      let humidity = data.main.humidity;
      let pressure = data.main.pressure;

      let date_rise = new Date(sunrise * 1000);
      let date_set = new Date(sunset * 1000);

      let sunrise_date = date_rise.toLocaleTimeString();
      let sunset_date = date_set.toLocaleTimeString();

      this.setState({
        temperature: Math.round(data.main.temp),
        city: data.name,
        country: data.sys.country,
        sunset: sunset_date,
        sunrise: sunrise_date,
        conditions: conditions,
        humidity: humidity,
        pressure: Math.round(pressure)
      });
    }

  };


  render() {

    return (
      <div className={styles.app}>
        <div className={styles.app__wrapper} >
          <p className={styles.app__title}>WeatherNow</p>
          <Downshift
            onChange={selection => this.getWeather(selection)}
            itemToString={item => (item ? item.value : "")} >
            {({ getInputProps, getItemProps, getMenuProps, isOpen, inputValue, highlightedIndex, selectedItem }) => (
              <div className={styles.app__search__wrapper} >
                <input className={styles.app__search} placeholder='City' {...getInputProps()} />
                <ul className={styles.app__search__list} {...getMenuProps()}>
                  {isOpen ? this.state.cities
                    .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                    .slice(0, 5).map((item, index) => (
                      <li {...getItemProps({
                        key: index, index, item,
                        style: { backgroundColor: highlightedIndex === index ? "lightgray" : "white", fontWeight: selectedItem === item ? "bold" : "normal" }
                      })} >
                        {item.value} ({item.country})
                      </li>
                    ))
                    : null}
                </ul>
              </div>
            )}
          </Downshift>
        </div>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          sunset={this.state.sunset}
          sunrise={this.state.sunrise}
          conditions={this.state.conditions}
          humidity={this.state.humidity}
          pressure={this.state.pressure}
        />
      </div>
    )
  }
}

export default App;

injectGlobal`
        
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: Helvetica, Arial, sans-serif;       
    }
`;


const styles = {
  app: css`
    margin: 30px 60px 60px 60px;

    @media (max-width: 767px) {
      margin: 30px 25px;
    }
  `,

  app__title: css`
    margin: 30px 150px 0 0;
    font-size: 45px;
    font-weight: 700;

    @media (max-width: 767px) {
      font-size: 30px;
    }
  `,

  app__wrapper: css`
    display: flex;
    flex-wrap: wrap;
  `,

  app__search__wrapper: css`
    position: relative;
    width: 100%;
  `,

  app__search: css`
    max-width: 600px;
    width: 100%;
    padding: 10px 20px;
    margin: 30px auto 0 auto;
    font-size: 30px;
    border: 0;
    border-bottom: 2px solid black;
    outline: none;

    @media (max-width: 767px) {
      max-width: 100%;
      font-size: 25px;
    }
  `,

  app__search__list: css`
    position: absolute;
    width: 100%;
    list-style: none;
    border-top: 0;
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 0;
    font-size: 18px;

    li {
      border: 1px solid black;
      padding: 5px 10px;
    }

    li:last-of-type {
      border-bottom: 2px solid black;
    }
  `
}