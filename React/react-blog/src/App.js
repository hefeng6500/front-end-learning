import React, { Component } from 'react';
import AppRouter from './AppRouter'
import './css/reset.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <AppRouter></AppRouter>
      </div>
    )
  }
}

export default App;
