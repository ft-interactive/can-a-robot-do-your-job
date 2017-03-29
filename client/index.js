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
      chosenJobId: null,
    };

    this.setChosenJob = this.setChosenJob.bind(this);
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

  setChosenJob(jobId) {
    console.log('chose job', jobId);
    this.setState({
      chosenJobId: jobId,
    });
  }

  render() {
    const resultOne = () => {
      if (this.state.chosenJobId) {
        return (<div id="resultOne">
          For {this.state.chosenJobId}, x of x tasks could be done by a robot.
        </div>);
      }
      return null;
    };

    return (
      <div>
        <Search industries={this.state.industries} setChosenJobFunc={this.setChosenJob} />
        {resultOne()}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
