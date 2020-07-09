import React from 'react';
import logo from './logo.svg';
import './App.css';
import { render } from '@testing-library/react';

class App extends React.Component {
    constructor(props){
      super(props);
      this.state = { apiResponse: "" }
    }

  callAPI() {
    fetch("http://localhost:9000/testAPI") //what is my api name??
        .then(res => res.text())
        .then(res => res.setState({ apiResponse: res }))
        .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return(
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"></img>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">{this.state.apiResponse}</p>
      </div>
    );
  }
}

export default App;