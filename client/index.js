import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as d3 from 'd3';

import Search from './components/search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      industries: [],
      jobs: [],
    };
  }

  componentDidMount() {
    axios
      .get('./data/data_sample.csv')
      .then((response) => {
        this.setState({
          data: d3.csvParse(response.data),
        });
      });

    axios
      .get('./data/major_groups.csv')
      .then((response) => {
        this.setState({
          industries: d3.csvParse(response.data),
        });
      });
  }

  render() {
    return (
      <div>
        <Search industries={this.state.industries} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
