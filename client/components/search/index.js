import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industries: this.props.industries,
      jobs: [],
    };

    this.getJobsList = this.getJobsList.bind(this);
    this.setJob = this.setJob.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      industries: nextProps.industries,
    });
  }

  getJobsList(majorGroupId) {
    axios
      .get('./data/minor_groups.csv')
      .then((response) => {
        const allJobs = d3.csvParse(response.data);
        const filteredJobs = allJobs.filter((job) => job.id.split('-')[0] === majorGroupId);

        this.setState({
          jobs: filteredJobs,
        });
      });
  }

  setJob(minorGroupId) {
    const jobName = this.state.jobs.filter(job => job.id === minorGroupId)[0].minor_group_title;

    this.props.setChosenJobFunc(minorGroupId, jobName);
  }

  render() {
    const dropdownIndustry = this.state.industries.map((industry) => {
      return (<option value={industry.id.split('-')[0]}>{industry.major_group_title}</option>)
    });

    const dropdownOccupation = this.state.jobs.map((job) => {
      return (<option value={job.id}>{job.minor_group_title}</option>)
    });

    return (
      <div id="search-container">
        <div id="preset-button-container">
          <span>Popular occupations: </span>
          <button className="o-buttons">Lawyer</button>
          <button className="o-buttons">Investment Banker</button>
          <button className="o-buttons">Clergy</button>
          <button className="o-buttons">Show me a random occupation</button>
        </div>
        <div id="category-container">
          <div className="category-dropdowns o-forms">
            <label htmlFor="dropdownIndustry" className="o-forms__label">Pick an industry</label>
            <div className="o-forms__affix-wrapper">
              <div className="step-number o-forms__prefix">1</div>
              <select className="o-forms__select" onChange={event => this.getJobsList(event.target.value)} id="dropdownIndustry">
                <option>Pick an industry</option>
                {dropdownIndustry}
              </select>
            </div>
          </div>
          <div className="category-dropdowns  o-forms">
            <label htmlFor="dropdownOccupation" className="o-forms__label">Pick a job</label>
            <div className="o-forms__affix-wrapper">
              <div className="step-number o-forms__prefix">2</div>
              <select className="o-forms__select" disabled={dropdownOccupation.length <= 0} onChange={event => this.setJob(event.target.value)} id="dropdownOccupation">
                <option>Pick a job</option>
                {dropdownOccupation}
              </select>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  industries: React.PropTypes.array,
  setChosenJobFunc: React.PropTypes.func,
};

export default Search;
