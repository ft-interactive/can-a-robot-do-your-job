import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as d3 from 'd3';
import * as _ from 'lodash';

import Search from './components/search';
import ProportionalStackedBarChart from './components/proportional-stacked-bar';
import Activities from './components/activities';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      industries: [],
      occupations: [],
      chosenJobId: null,
      chosenJobName: null,
      allOccupationsResults: {},
      jobsResults: {},
      personalizedResults: {},
      jobActivities: {},
    };

    this.setChosenJob = this.setChosenJob.bind(this);
    this.getActivityResultNumbers = this.getActivityResultNumbers.bind(this);
    this.updatePersonalActivities = this.updatePersonalActivities.bind(this);
  }

  componentDidMount() {
    axios
      .get('./data/data_sample.csv')
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

    axios
      .get('./data/minor_groups.csv')
      .then((response) => {
        this.setState({
          occupations: d3.csvParse(response.data),
        });
      });
  }

  getActivityResultNumbers(jobActivities) {
    const robotActivities = _.filter(jobActivities, (job) => {
      if (job.length > 1) {
        return job.reduce((a, b) => {
          return (a['Technically automatable flag'] === 'TRUE' || a === true) && b['Technically automatable flag'] === 'TRUE';
        }, true);
      }
      return job[0]['Technically automatable flag'] === 'TRUE';
    });

    const notRobotActivities = _.filter(jobActivities, (job) => {
      if (job.length > 1) {
        return job.reduce((a, b) => {
          return (a === true && b['Technically automatable flag'] === 'FALSE');
        }, true);
      }
      return job[0]['Technically automatable flag'] === 'FALSE';
    });

    return {
      yes: robotActivities.length,
      no: notRobotActivities.length,
      sometimes: Object.keys(jobActivities).length - robotActivities.length - notRobotActivities.length,
      jobActivities,
      numJobActivities: Object.keys(jobActivities).length,
    };
  }

  setChosenJob(jobId) {
    const jobName = this.state.occupations.filter(job => job.id === jobId)[0].minor_group_title;

    // get total number of job activities given jobId
    const jobIdRe = `${jobId.split('-')[0]}-${jobId.split('-')[1].split('')[0]}`;
    const jobActivities = _.groupBy(this.state.data.filter(row => row['BLS Code'].slice(0, -3) === jobIdRe), 'DWA Title');

    const jobsResults = this.getActivityResultNumbers(jobActivities);

    this.setState({
      chosenJobId: jobId,
      chosenJobName: jobName,
      jobsResults,
      jobActivities,
    });
  }

  updatePersonalActivities(selectedActivities) {
    console.log('selected activities', selectedActivities);

    this.setState({
      personalizedResults: this.getActivityResultNumbers(selectedActivities),
    });
  }

  render() {
    const proportionalBarChartData = [
      { key: 'allOccupationsResults',
        label: 'All occupations',
        data: this.state.allOccupationsResults },
      { key: 'jobsResults',
        label: this.state.chosenJobName || 'Your occupation',
        data: this.state.jobsResults },
      { key: 'personalizedResults',
        label: 'Me',
        data: this.state.personalizedResults },
    ];

    const resultOne = () => {
      if (this.state.chosenJobId) {
        return (<div id="resultOne">
          <div>For this occupation,</div>
            <span id="resultOne__bigNumber">{this.state.jobsResults.yes}</span>
            <div>of {this.state.jobsResults.numJobActivities} tasks</div>
            <div>could be done by a robot.</div>
            <div className="resultOne__methodology">Methodology</div>
        </div>);
      }
      return null;
    };

    const personalProgress = () => {
      if (this.state.chosenJobId && this.state.personalizedResults.numJobActivities) {
        return (<p><b>{this.state.personalizedResults.yes}</b> of {this.state.personalizedResults.numJobActivities} could be done by a robot.</p>);
      }
      return null;
    };

    return (
      <div>
        <Search industries={this.state.industries} occupations={this.state.occupations} setChosenJobFunc={this.setChosenJob} />
        {resultOne()}
        <ProportionalStackedBarChart data={proportionalBarChartData} />
        {personalProgress()}
        <Activities activities={this.state.jobActivities} updatePersonalActivitiesFunc={this.updatePersonalActivities} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
