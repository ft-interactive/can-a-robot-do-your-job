import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import * as d3 from 'd3';
import * as _ from 'lodash';

import Search from './components/search';
import ProportionalStackedBarChart from './components/proportional-stacked-bar';
import Activities from './components/activities';
import Scorecard from './components/scorecard';

import gaSendEvent from './components/core/ga-analytics';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      industries: [],
      occupations: [],
      chosenJobId: null,
      chosenJobName: null,
      exampleJobsList: [],
      allOccupationsResults: {},
      jobsResults: {},
      personalizedResults: {},
      jobActivities: {},
      loaded: false,
      totalActivitiesCheckedOnPage: 0,
      totalJobsChosenOnPage: 0,
      scrolledPastText: false,
      scrolledPastMethodology: false,
    };

    this.setChosenJob = this.setChosenJob.bind(this);
    this.getActivityResultNumbers = this.getActivityResultNumbers.bind(this);
    this.updatePersonalActivities = this.updatePersonalActivities.bind(this);
    this.clearOutChosenJob = this.clearOutChosenJob.bind(this);
  }

  componentDidMount() {
    axios
      .get('https://ig.ft.com/static/can-a-robot-do-your-job/data.csv')
      .then((response) => {
        const data = d3.csvParse(response.data);
        const allOccupationsActivities = _.groupBy(data, 'DWA Title');
        const allOccupationsResults = this.getActivityResultNumbers(allOccupationsActivities);

        this.setState({
          data,
          allOccupationsResults,
          loaded: true,
        });
      });

    axios
      .get('https://ig.ft.com/static/can-a-robot-do-your-job/major_groups.csv')
      .then((response) => {
        this.setState({
          industries: d3.csvParse(response.data),
        });
      });

    axios
      .get('https://ig.ft.com/static/can-a-robot-do-your-job/minor_groups.csv')
      .then((response) => {
        this.setState({
          occupations: d3.csvParse(response.data),
        });
      });

    // send events on page unload
    const unloadEventName = ('onbeforeunload' in window) ? 'beforeunload' : 'unload';
    window.addEventListener(unloadEventName, () => {
      gaSendEvent('page-total', 'totalActivities', this.state.totalActivitiesCheckedOnPage + (this.state.personalizedResults.numJobActivities || 0));
      gaSendEvent('page-total', 'totalJobsChosen', this.state.totalJobsChosenOnPage);
      gaSendEvent('scroll', 'text', this.state.scrolledPastText);
      gaSendEvent('scroll', 'methodology', this.state.scrolledPastMethodology);
    });

    const dividerDiv = document.querySelector('#divider');
    const methodologyDiv = document.querySelector('#methodology');
    window.addEventListener('scroll', () => {
      if (dividerDiv.getBoundingClientRect().top <= 0) {
        this.setState({
          scrolledPastText: true,
        });
      }
      if (methodologyDiv.getBoundingClientRect().top <= 0) {
        this.setState({
          scrolledPastMethodology: true,
        });
      }
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

    const exampleJobsList = this.state.occupations.filter(job => job.id === jobId)[0].sample_occupations.split('|');

    // get total number of job activities given jobId
    const jobIdRe = `${jobId.split('-')[0]}-${jobId.split('-')[1].split('')[0]}`;
    const jobActivities = _.groupBy(this.state.data.filter(row => row['BLS Code'].slice(0, -3) === jobIdRe), 'DWA Title');

    const jobsResults = this.getActivityResultNumbers(jobActivities);

    this.setState({
      chosenJobId: jobId,
      chosenJobName: jobName,
      exampleJobsList,
      jobsResults,
      jobActivities,
      totalJobsChosenOnPage: this.state.totalJobsChosenOnPage + 1,
    });
  }

  clearOutChosenJob() {
    const resetEvent = new CustomEvent('resetEvent');
    document.dispatchEvent(resetEvent);

    this.setState({
      chosenJobId: null,
      chosenJobName: null,
      exampleJobsList: [],
      jobsResults: {},
      jobActivities: {},
      personalizedResults: {},
      totalActivitiesCheckedOnPage: (this.state.totalActivitiesCheckedOnPage || 0) + (this.state.personalizedResults.numJobActivities || 0),
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
        label: 'Your result',
        data: this.state.personalizedResults },
    ];

    // like toLowerCase() except with some exceptions
    const customToLowerCase = (phrase) => {
      const exceptions = ['HR Assistants'];
      if (exceptions.indexOf(phrase) > -1) {
        if (phrase === 'HR Assistants') return 'HR assistants';
        return phrase;
      }
      return phrase.toLowerCase();
    };

    const resultOne = () => {
      if (this.state.chosenJobId) {
        const exampleJobsListState = this.state.exampleJobsList.map(d => customToLowerCase(d));
        const exampleJobsList = `<span class="resultone___exampleoccupations">${exampleJobsListState.slice(0, -1).join('</span>, <span class="resultone___exampleoccupations">')} and <span class="resultone___exampleoccupations">${exampleJobsListState.slice(-1)}</span>.`;

        return (<div id="resultOne">
          <div>For {this.state.chosenJobName.toLowerCase()},</div>
          <span id="resultOne__bigNumber">{this.state.jobsResults.yes}</span>
          <div>of {this.state.jobsResults.numJobActivities} activities</div>
          <div>could be done by a robot.</div>
          <div id="resultOne__top3">This group includes jobs such as <span dangerouslySetInnerHTML={{ __html: exampleJobsList }} /></div>
          <div className="resultOne__methodology"><a href="#methodology">Read the methodology</a></div>
        </div>);
      }
      return null;
    };

    return (
      <div id="custom-react" className={`${(this.state.chosenJobId ? 'jobchosen' : '')} ${(this.state.loaded ? '' : 'loading')}`}>
        <div id="overlay" />
        <div className="loadingMessage">Loading interactive...</div>
        <h2 className="o-typography-subhead">Find your occupation:</h2>
        <Search industries={this.state.industries} occupations={this.state.occupations} setChosenJobFunc={this.setChosenJob} clearOutChosenJobFunc={this.clearOutChosenJob} />
        {resultOne()}
        {(this.state.chosenJobId ? <ProportionalStackedBarChart data={proportionalBarChartData} /> : null)}
        <Activities chosenJobId={this.state.chosenJobId} chosenJobName={this.state.chosenJobName} activities={this.state.jobActivities} updatePersonalActivitiesFunc={this.updatePersonalActivities} />
        <Scorecard chosenJobName={this.state.chosenJobName} score={this.state.personalizedResults}/>
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-container'));
