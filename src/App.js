import React, { Component } from 'react';
import './App.css';
import Api from './GetGarbage';

class App extends Component {
  render() {
    return (
      <div className="App">

      <Api />
      
      </div>
    );
  }
}

export default App;
