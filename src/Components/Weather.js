import React from 'react';


export class Weather extends React.Component {
    render() {
        return (
            <div>
                {this.props.city &&
                    <div>
                        <p>Country, City: {this.props.country}, {this.props.city}</p>
                        <p>Temperature: {this.props.temperature} °C</p>
                        <p>Sunrise: {this.props.sunrise}</p>
                        <p>Sunset: {this.props.sunset}</p>
                    </div>
                }
                <p>{this.props.error}</p>
            </div>
        )
    }
}