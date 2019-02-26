import React, { Component } from 'react';

import InputQuery from './component/InputQuery';
import HeroSection from './component/HeroSection';
import ForecastSection from './component/ForecastSection';
import Graph from './component/Graph';
import Loading from './component/Loading';
import ErrorHandler from './component/ErrorHandler';

import Unsplash from 'unsplash-js';
import moment from 'moment';

const weather__APIkey="241e69ca0c5b484eb8e3fa7d0a702218";

const unsplash = new Unsplash({
  applicationId: "338692257be6ef8af5c7853a397e0a0c1de80f97de67e49e1b074165e57cd221",
  secret: "33276aad3608ecba86b9ec166f4303d84f68b55359315699df6102b09221b264"
});

class App extends Component {

  state={
    loading:false,
    error_current:null,
   
    error_hourly:null,
    
    error_picture:null,
    
    error_forcast:null,
    currentWeather:undefined,
    forcastWeather:undefined,
    CurrentGraphData:undefined,
    graphData:undefined,
    img:'',
    city:'',
    country_code:''

  }
  componentDidMount(){
    this.getCurrentWeather('Dhaka' ,'BD');
    this.getHourlyweather('Dhaka' ,'BD');
    this.getForcastedWeather('Dhaka' ,'BD');
  }


  getCurrentWeather= async(city, country) =>{
    this.setState({
      loading:true,
      error_current:null
    });

    let url=`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=${weather__APIkey}`;
    try {
      let response = await fetch(url);
      if(response.code === 200 ){
        throw new Error(response, "The response from the APi was bad") ;  
      }
      let data = await response.json();
     // console.log(data.data);
      
      let obj = await {
        city:data.data[0].city_name,
        country: data.data[0].country_code,
        des:data.data[0].weather.description,
        temp:data.data[0].temp,
        realfeel:data.data[0].app_temp,
        icon:data.data[0].weather.code,
        sunrise:data.data[0].sunrise,
        sunset:data.data[0].sunset,
        ts:data.data[0].ts,
      }

    
   
        this.setState({
          loading:false,
          error_current:null,
          currentWeather:obj,
          city:obj.city,
          country_code:obj.country
        });
        this.getPicture(obj.des+" weather" );
       //this.getForcastedWeather(this.state.city , this.state.country_code);

    } catch (error) {
      console.log(error);
      this.setState({
        loading:false,
        error_current:"The City and Country Might not Exist in our Database"
      })
    }
   
  }


  getHourlyweather= async (city,country)=>{
    this.setState({
      loading:true,
      error_hourly:null
    });
  let url=`https://api.weatherbit.io/v2.0/forecast/hourly?city=${city}&country=${country}&key=${weather__APIkey}`;
    try {
      let response = await fetch(url);
      if(response.code === 200 ){
        throw new Error(response) ;  
      }
      let data = await response.json();
      //console.log(data.data);
      const dataArr = data.data.splice(0,24).map((d)=>{
       
        let date2 = moment(d.ts *1000).format('h:mm A');

      
        return{
            Time:date2,
            Temp:d.temp
        }


    })
   
        this.setState({
          loading:false,
          error_hourly:null,
          CurrentGraphData:dataArr,
          
        });
        
       //this.getForcastedWeather(this.state.city , this.state.country_code);

    } catch (error) {
      console.log(error);
      this.setState({
        loading:false,
        error_hourly:"Dont have enough data for this City/Country"
      })
     
    }
   
  }

  getForcastedWeather= async (city,country)=>{
  this.setState({
    loading:true,
    error_forcast:null,

  });

  let url=`https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&country=${country}&key=${weather__APIkey}`;

try {
  let response = await fetch(url);
  if(response.code === 200 ){
    console.log(response);
    throw new Error(response) ; ;  
  }

  let data = await response.json();
  //console.log(data);
  
  const dataArr =await data.data.map((d)=>{
   
    let date1 = moment(d.ts *1000).format('MMM DD');
   
    return{
        Time:date1,
        Temp:d.temp
    }


})


  this.setState({
    loading:false,
    error_forcast:null,
    forcastWeather:data.data.splice(1,5),
    graphData:dataArr
  });
} catch (error) {
  console.log(error);
      this.setState({
        loading:false,
        error_forcast:"Dont have enough data for this City/Country",
      })
}

  


}

  getPicture= async (query)=>{
    this.setState({
      loading:true,
      error_picture:null,

    });
   await unsplash.search.photos(query, 1 , 10 )
    .then(res => res.json())
    .then(json => {
      console.log(json);
      this.setState({
        loading:false,
        img:json.results[3].urls.regular,
        error_picture:null,
      })
    })
    .catch((err)=>{
      console.log(err);
      this.setState({
        loading:false,
        error_picture:"Broken Search ... Please type again",
      })
    })
  }

  handleSubmit=(city, country)=>{
    console.log(city, country);
    this.setState({
      loading:true

    })
    this.getCurrentWeather(city ,country);
    this.getHourlyweather(city,country);
    this.getForcastedWeather(city , country);
  }
resetError=()=>{
  this.setState({
    error_current:null,
    error_forcast:null,
    error_hourly:null,
    error_picture:null
  });
}


  render() {
    const { loading , error_current , error_hourly  , error_picture, error_forcast } = this.state;
    if(loading){
      return(<Loading />)
    }else{
      return (
        <div className="App">
          <div className="search__container">
  
            <InputQuery handleSubmit={this.handleSubmit} />
          </div>
          <div className="container">
  
          {error_current || error_picture  ?
           <ErrorHandler msg={error_current} resetError={this.resetError} /> :
           <HeroSection 
                img={this.state.img} 
                weather={this.state.currentWeather} 
                />  
            }
  
            {error_forcast ?
            <ErrorHandler msg={error_forcast} resetError={this.resetError}/> : 
            <ForecastSection forcastWeather={this.state.forcastWeather} /> 
            }
            
           {error_hourly ?
                   <ErrorHandler msg={error_hourly}  resetError={this.resetError}/> : 
                   <div className="text-centr">
                    <h1>Next 48 hours </h1>
                     <Graph data={this.state.CurrentGraphData} /> 
                   </div>
              }
              
                {error_forcast ?
                  <ErrorHandler msg={error_forcast} resetError={this.resetError} /> :
                  <div className="text-centr">
                    <h1>16 DAY FORCAST</h1>
                  <Graph  data={this.state.graphData} /> 
                  </div>
                  
                  }
              
          </div>
        </div>
      );
    }
    
  }
}

export default App;
