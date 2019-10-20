import React from 'react';
import { css } from 'emotion';

class Weather extends React.Component {
  render() {
    return (
      <div>
        <div className={styles.weather}>
          {this.props.city &&
            <div className={styles.weather__wrapper}>
              <p className={styles.weather__city}>{this.props.city}, {this.props.country}</p>
              <div className={styles.weather__head} >
                <p>{this.props.temperature}<span> °F</span></p>
                <GetIcon type={this.props.conditions} />
              </div>
              <div className={styles.weather__info}>
                <div className={styles.weather__info__item}>
                  <p>Pressure:</p>
                  <p>{this.props.pressure} mb</p>
                </div>
                <div className={styles.weather__info__item}>
                  <p>Humidity:</p>
                  <p>{this.props.humidity}%</p>
                </div>
                <div className={styles.weather__info__item}>
                  <p>Sunrise:</p>
                  <p>{this.props.sunrise}</p>
                </div>
                <div className={styles.weather__info__item}>
                  <p>Sunset:</p>
                  <p>{this.props.sunset}</p>
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    )
  }
}

function GetIcon({ type }) {
  if (type === 'Clear') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/sun.svg)' }} />;
  } else if (type === 'Clouds') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/cloudy.svg)' }} />;
  } else if (type === 'Rain') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/rain.svg)' }} />;
  } else if (type === 'Thunderstorm') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/storm.svg)' }} />;
  } else if (type === 'Snow') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/snowflake.svg)' }} />;
  } else if (type === 'Mist') {
    return <div className={styles.weather__img} style={{ backgroundImage: 'url(/images/tornado.svg)' }} />;
  }
}

export default Weather;

const styles = {
  weather: css`
    margin: 80px auto;
    max-width: 360px;
    `,

  weather__wrapper: css`
    border: 3px solid black;
    border-radius: 25px;
    padding: 40px;

    @media (max-width: 569px) {
        padding: 20px;
    }
  `,

  weather__head: css`
    margin: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;

     p {
       padding-left: 10px; 
        font-size: 30px;

       @media (max-width: 569px) {
           font-size: 25px;
            padding-left: 0; 
        }

       span {
           font-size: 20px;

           @media (max-width: 569px) {
                font-size: 18px;
            }
       }
    }
  `,

  weather__city: css`
    text-align: center;
    font-weight: 700;
    font-size: 30px;

    @media (max-width: 569px) {
        font-size: 25px;
    }
  `,

  weather__img: css`
    width: 120px;
    height: 120px;
    margin-left: 60px;
    background-repeat: no-repeat;

    @media (max-width: 569px) {
        width: 90px;
        height: 90px;
        margin-left: 20px;
    }
  `,

  weather__info: css`
    display: flex;
    flex-wrap: wrap;
  `,

  weather__info__item: css`
    width: 50%;
    padding: 10px;

    p {
        margin: 5px 0;
    }

    p:first-of-type {
        font-size: 18px;
    }
  `,

}