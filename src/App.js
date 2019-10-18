import React from 'react';
import { Weather } from './Components/Weather';
import { citiesList } from './Components/CitiesList';
import Downshift from 'downshift'



const API_KEY = '2f9bf7dfeb836a758792106fef8a46f7';

class App extends React.Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    sunset: undefined,
    sunrise: undefined,
    error: undefined,

    cities: citiesList
  }

  getWeather = async (selection) => {


    const city = selection.value;
    const country = selection.country;

    if (city) {
      const API_URL = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&APPID=${API_KEY}&units=metric`);
      const data = await API_URL.json();

      if (data.cod === '404') {
        this.setState({
          temperature: undefined,
          city: undefined,
          country: undefined,
          sunset: undefined,
          sunrise: undefined,
          error: 'City not found'
        })
      } else {
        let sunrise = data.sys.sunrise;
        let sunset = data.sys.sunset;

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
          error: undefined
        });
      }
    } else {
      this.setState({
        temperature: undefined,
        city: undefined,
        country: undefined,
        sunset: undefined,
        sunrise: undefined,
        error: 'Choose city'
      })
    }
  };


  render() {
  
    return (
      <div>
        <Downshift
        onChange={selection => this.getWeather(selection) }
          itemToString={item => (item ? item.value : "")}
        >
          {({
            getInputProps,
            getItemProps,
            getLabelProps,
            getMenuProps,
            isOpen,
            inputValue,
            highlightedIndex,
            selectedItem
          }) => (
            <div>
              <input {...getInputProps()} />
              <ul {...getMenuProps()}>
                {isOpen
                  ? this.state.cities
                      .filter(item => !inputValue || item.value.toLowerCase().includes(inputValue.toLowerCase()))
                      .slice(0, 5).map((item, index) => (
                        <li
                          {...getItemProps({
                            key: index,
                            index,
                            item,
                            style: {
                              backgroundColor:
                                highlightedIndex === index ? "lightgray" : "white",
                              fontWeight: selectedItem === item ? "bold" : "normal"
                            }
                          })}
                        >
                          {item.value} , 
                          {item.country}
                        </li>
                      ))
                  : null}
              </ul>
            </div>
          )}
        </Downshift>
        <Weather
          temperature={this.state.temperature}
          city={this.state.city}
          country={this.state.country}
          sunset={this.state.sunset}
          sunrise={this.state.sunrise}
          error={this.state.error}
        />
      </div>
    )
  }
}

export default App;