import React, { Component } from 'react';
import cities from './data/cities';

class InputQuery extends Component {
    state = { 
      address:'',
      filteredCities:cities,
      selectedCity:[],
      error:'',
      toggle:'none'
     }
handleSubmit=(e)=>{
    e.preventDefault();

    if(this.state.address === ""){
        this.setState(
          {
            error:"Please Select a Option"
          }
        )
    }else{

      if(this.state.selectedCity.length <1 ){
        this.setState({
          error:"Please select an Option from the list"
        })
      }else{
        let add = this.state.address.split(',')

       // console.log("Send Value ", add);
        this.props.handleSubmit(add[0], add[1]);
      }
      
    }
    this.setState({
      address:'',
      toggle:'none'
    })
}
selectOption=(a,b)=>{
  let add= a+","+b;

  
  this.setState({
      address:add,
      selectedCity:[...add]
  });
}



handleChange=(e)=>{
  e.preventDefault();
  this.setState({
    address:e.target.value.trim(),
    error:'',
    selectedCity:[]

 });
 let currentCities= [];
  let newCities=[];
    if(e.target.value !== ""){
      currentCities=cities;
      newCities= currentCities.filter(item =>{
        const lc = item.city.toLowerCase();
        const filter =e.target.value.trim().toLowerCase();
        return lc.includes(filter);
      });

    }else{
      newCities=this.state.filteredCities;
    }
    
    this.setState({
      filteredCities:newCities
    });

}
showFilter =()=>{
  this.setState({
    toggle:'block'
  })
}
    render() {
     
        
        return (
          <form>
          <div className="search">
                  <input type="text" id="city" required="required"
                  placeholder="Search For a City..."
                  name="address"
                  onChange={this.handleChange}
                  onFocus={this.showFilter}
                  value={this.state.address}
                  className="searchTerm"
                  />
                  <button type="submit" className="searchButton" onClick={this.handleSubmit }>?
                  </button>
           </div>
                  <ul className="input__list " style={{display:this.state.toggle}}>
                  {this.state.filteredCities.splice(0,5).map((city,index)=>
                        <li key={index} onClick={()=>{this.selectOption(city.city,city.country)}}
                        >{city.city},{city.country}
                        </li>
                        
                       )}
                       <li>...</li>
                  </ul>
                  <p>{this.state.error}</p>
        </form>
        );
    }
}
 
export default InputQuery;
