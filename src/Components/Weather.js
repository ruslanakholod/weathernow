import React from 'react';
import { css } from 'emotion';

class Weather extends React.Component {
    render() {
        console.log(this.props.conditions)
        return (
            <div className={styles.weather}>
                <div className={styles.weather__wrapper}>
                    {this.props.city &&
                        <div className={styles.weather__info}>
                            <div>
                                <GetIcon type={this.props.conditions} />
                                <p>{this.props.country}, {this.props.city}</p>
                            </div>
                            <p>Temperature: {this.props.temperature} °C</p>
                            <p>Sunrise: {this.props.sunrise}</p>
                            <p>Sunset: {this.props.sunset}</p>
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

    `,

    weather__wrapper: css`
        
    `,

    weather__info: css`
        
    `,

    weather__img: css`
        width: 170px;
        height: 170px; 
    `,

}