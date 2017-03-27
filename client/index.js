import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class App extends Component {
  render () {
    return (
      <div>
        <p>This is a test</p>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
