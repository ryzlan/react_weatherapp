import React, { Component } from 'react';
import ShowIcons from './ShowIcons';
import moment from 'moment';


class HeroSection extends Component {
    state = { 
        weather:{}
     }
    render() { 
        if(this.props.img && this.props.weather){
            const {city , country , des , icon , realfeel, sunrise , sunset , temp ,ts} =this.props.weather;
            return(
                <div className="hero_container">
                <img src={this.props.img } alt="location images" />
                    <div className="text-block">
                        <div className="banner">
                            <p> { city +","+ country}</p>
                            <p> { moment(ts *1000).format('dddd, MMM Do') }</p>
                        </div>
                        <div className="main">
                            <div className="main__icon"> 
                                <ShowIcons icon={icon} /> 
                                <p> {des }</p>
                            </div>
                            <div className="temp">
                                <p className="temp_val" >{ temp }<span className="wi wi-celsius"></span>
                                </p>
                                <p className="realfeel"><i className="wi wi-thermometer">{ realfeel}<span className="wi wi-celsius"></span></i></p>
                                <p className="rs"><i className="wi wi-sunrise">{ sunrise }</i> <i  className="wi wi-sunset">{ sunset }</i> </p>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div>
                    naii
                </div>
            )
        }
       
    }
}
 
export default HeroSection;