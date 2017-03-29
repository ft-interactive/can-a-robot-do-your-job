import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as d3 from 'd3';
import * as _ from 'lodash';

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
      allOccupationsResults: {},
      jobsResults: {},
      personalizedResults: {},
    };

    this.setChosenJob = this.setChosenJob.bind(this);
    this.getActivityResultNumbers = this.getActivityResultNumbers.bind(this);
  }

  componentDidMount() {
    axios
      .get('./data/data.csv')
      .then((response) => {
        const data = d3.csvParse(response.data);
        const allOccupationsActivities = _.groupBy(data, 'DWA Title');
        const allOccupationsResults = this.getActivityResultNumbers(allOccupationsActivities);

        this.setState({
          data,
          allOccupationsResults,
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

  getActivityResultNumbers(jobActivities) {
    const robotJobActivities = _.filter(jobActivities, (job) => {
      if (job.length > 1) {
        return job.reduce((a, b) => {
          return a['Technically automatable flag'] === 'TRUE' && b['Technically automatable flag'] === 'TRUE';
        });
      }
      return job[0]['Technically automatable flag'] === 'TRUE';
    });

    return {
      yes: robotJobActivities.length,
      no: 30,
      sometimes: 40,
      jobActivities,
      numJobActivities: Object.keys(jobActivities).length,
    };
  }

  setChosenJob(jobId, jobName) {
    console.log('chose job', jobId, jobName);

    // get total number of job activities given jobId
    const jobIdRe = `${jobId.split('-')[0]}-${jobId.split('-')[1].split('')[0]}`;
    const jobActivities = _.groupBy(this.state.data.filter(row => row['BLS Code'].slice(0, -3) === jobIdRe), 'DWA Title');

    const jobsResults = this.getActivityResultNumbers(jobActivities);

    this.setState({
      chosenJobId: jobId,
      chosenJobName: jobName,
      jobsResults,
    });
  }

  render() {
    const resultOne = () => {
      if (this.state.chosenJobId) {
        return (<div id="resultOne">
          For {this.state.chosenJobName}, {this.state.jobsResults.yes} of {this.state.jobsResults.numJobActivities} tasks could be done by a robot.
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
