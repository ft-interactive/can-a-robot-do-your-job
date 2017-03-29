import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as d3 from 'd3';

import Search from './components/search';
import ProportionalStackedBarChart from './components/proportional-stacked-bar';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      industries: [],
      chosenJobId: null,
      chosenJobName: null,
      jobActivities: [],
      numTotalJobActivities: null,
      numRobotJobActivities: null,
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

  setChosenJob(jobId, jobName) {
    console.log('chose job', jobId, jobName);

    // get total number of job activities given jobId
    const jobIdRe = `${jobId.split('-')[0]}-${jobId.split('-')[1].split('')[0]}`;
    const jobActivities = this.state.data.filter(row => row['BLS Code'].slice(0, -3) === jobIdRe);

    this.setState({
      chosenJobId: jobId,
      chosenJobName: jobName,
      numRobotJobActivities: jobActivities.filter(job => job['Technically automatable flag'] === 'TRUE').length,
      numTotalJobActivities: jobActivities.length,
      jobActivities,
    });
  }

  render() {
    const resultOne = () => {
      if (this.state.chosenJobId) {
        return (<div id="resultOne">
          For {this.state.chosenJobName}, {this.state.numRobotJobActivities} of {this.state.numTotalJobActivities} tasks could be done by a robot.
        </div>);
      }
      return null;
    };

    return (
      <div>
        <Search industries={this.state.industries} setChosenJobFunc={this.setChosenJob} />
        {resultOne()}
        {/* <ProportionalStackedBarChart data={[]} /> */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
