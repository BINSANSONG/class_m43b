import React from "react";
import ReactDOM from "react-dom";
import SeasonDisplay from "./SeasonDisplay";

class App extends React.Component {
  
  state = {
    lat: null, // 아직모른다. but 들어는 온다.
    errorMessage: '',
  };
  
  render() {
    // 사용자 허용함
    if (!this.state.errorMessage && this.state.lat) {
      return (<SeasonDisplay latitude={this.state.lat}/>);
    }

    // 사용자 거부함
    if (this.state.errorMessage && !this.state.lat) {
      return (<div>Error: {this.state.errorMessage}</div>);
    }
    
    // 허용/거부 기다리는 중..
    return(<div>Loading....</div>)
  }

  componentDidMount () {
    window.navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
      },
      error => { 
        this.setState({ errorMessage: error.message });
      }
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#root"));
