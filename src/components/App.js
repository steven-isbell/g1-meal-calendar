import React, { Component } from 'react';

import Calendar from './Calendar/Calendar';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ErrorBoundary>
          <Calendar />
        </ErrorBoundary>
      </div>
    );
  }
}

export default App;
