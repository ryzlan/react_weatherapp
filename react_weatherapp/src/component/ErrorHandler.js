import React, { Component } from 'react';

class ErrorHandler extends Component {
    render() { 
        if (this.props.msg) {
            return (
              <div className="err_wrapper">
                <h2>Looks like something went wrong here </h2>
                <p>{this.props.msg}</p>
                <button  onClick={this.props.resetError} > take me Back to safety </button>
              </div>
            );
          }
         
          return '';
        }  
      
}
 
export default ErrorHandler;