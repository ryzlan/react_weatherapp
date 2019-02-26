import React, { Component } from 'react';
import moment from 'moment';
import ShowIcons from './ShowIcons';


class WeatherCard extends Component {
    state = {  }
    render() { 
        
        const {icon , des, ts, hi_temp, lo_temp } = this.props.data;
        
        return ( 
            <div className="weather_card">
                <div className="icon__wrapper">
                    <ShowIcons icon={icon} />
                    <p>{ des}</p>
                </div>
                <div className="hi__low">
                    <i className="wi wi-direction-up"> { hi_temp}<span className="wi wi-celsius"></span> </i> 
                    <i className="wi wi-direction-down"> {lo_temp}<span className="wi wi-celsius"></span></i> 
                </div> 
                <div className="weather__date">
                    <p>{ moment(ts *1000).format('ddd, MMM Do') }</p>
                </div>
                 
            </div>

         );
    }
}
 
export default WeatherCard;

