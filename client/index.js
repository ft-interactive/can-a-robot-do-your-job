import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Search from './components/search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <div>
        <div id="preset-button-container">
          <span>Popular occupations: </span>
          <button className="o-buttons">Lawyer</button>
          <button className="o-buttons">Investment Banker</button>
          <button className="o-buttons">Clergy</button>
          <button className="o-buttons">Show me a random occupation</button>
        </div>
        <Search data={this.state.data} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
