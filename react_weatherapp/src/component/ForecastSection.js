import React, { Component } from 'react';

import WeatherCards from './WeatherCards';

class ForecastSection extends Component {
    state = {  }
    render() { 
        
        if(this.props.forcastWeather){
            return (<div className="forcast__wrapper">
                {this.props.forcastWeather.map((w, index) => {
                    let obj ={
                        icon:w.weather.code,
                        des:w.weather.description,
                        hi_temp:w.max_temp,
                        lo_temp:w.min_temp,
                        ts:w.ts
                    }

                    return (<WeatherCards key={index} data={obj} /> )
                })}
    
            </div> );
        }else{
           return <p>etao nai</p>
        }
        
    }
}
 
export default ForecastSection;