import React, { Component } from 'react';
import axios from 'axios';
import * as d3 from 'd3';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      industries: this.props.industries,
      occupations: this.props.occupations,
      jobs: [],
    };

    this.getJobsList = this.getJobsList.bind(this);
    this.setJob = this.setJob.bind(this);
  }

  componentDidMount() {
    const presetButtons = document.querySelectorAll('#preset-button-container button');
    Array.from(presetButtons).forEach((elements) => {
      elements.addEventListener('click', () => {
        let minorCategoryId = elements.getAttribute('data-id');
        if (minorCategoryId === 'random') {
          minorCategoryId = this.state.occupations[Math.floor(Math.random() * this.state.occupations.length)].id;
        }
        const majorGroupId = minorCategoryId.split('-')[0];
        this.getJobsList(majorGroupId);
        this.setJob(minorCategoryId);

        if (document.querySelector('#dropdownIndustry option[selected="selected"]')) {
          document.querySelector('#dropdownIndustry option[selected="selected"]').removeAttribute('selected');
        }

        if (document.querySelector('#dropdownOccupation option[selected="selected"]')) {
          document.querySelector('#dropdownOccupation option[selected="selected"]').removeAttribute('selected');
        }

        document.querySelector(`#dropdownIndustry option[value="${majorGroupId}"]`).setAttribute('selected', 'selected');
        document.querySelector(`#dropdownOccupation option[value="${minorCategoryId}"]`).setAttribute('selected', 'selected');
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      industries: nextProps.industries,
      occupations: nextProps.occupations,
    });
  }

  getJobsList(majorGroupId) {
    const allJobs = this.state.occupations;
    const filteredJobs = allJobs.filter(job => job.id.split('-')[0] === majorGroupId);

    this.setState({
      jobs: filteredJobs,
    });
  }

  setJob(minorGroupId) {
    this.props.clearOutChosenJobFunc();
    this.props.setChosenJobFunc(minorGroupId);
  }

  render() {
    const dropdownIndustry = this.state.industries.map((industry) => {
      return (<option key={industry.id.split('-')[0]} value={industry.id.split('-')[0]}>{industry.major_group_title}</option>);
    });

    const dropdownOccupation = this.state.jobs.map((job) => {
      return (<option key={job.id} value={job.id}>{job.minor_group_title}</option>);
    });

    return (
      <div id="search-container">
        <div id="category-container">
          <div className="category-dropdowns o-forms">
            <label htmlFor="dropdownIndustry" className="o-forms__label">Select a job category</label>
            <div className="o-forms__affix-wrapper">
              <div className="step-number o-forms__prefix">1</div>
              <select className="o-forms__select" onChange={event => this.getJobsList(event.target.value)} id="dropdownIndustry">
                <option>Select a job category</option>
                {dropdownIndustry}
              </select>
            </div>
          </div>
          <div className="category-dropdowns  o-forms">
            <label htmlFor="dropdownOccupation" className="o-forms__label">Select an occupation</label>
            <div className="o-forms__affix-wrapper">
              <div className="step-number o-forms__prefix">2</div>
              <select className="o-forms__select" disabled={dropdownOccupation.length <= 0} onChange={event => this.setJob(event.target.value)} id="dropdownOccupation">
                <option>Select an occupation</option>
                {dropdownOccupation}
              </select>
            </div>
          </div>
          <div id="preset-button-container">
            <span className="examplesList">Or choose an example: </span>
            <div>
              <button className="o-buttons" data-id="13-2000">Financial specialist</button>
              <button className="o-buttons" data-id="31-1000">Healthcare support</button>
              <button className="o-buttons" data-id="25-1000">Postsecondary teacher</button>
              <button className="o-buttons" data-id="random">Random</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  industries: React.PropTypes.array,
  occupations: React.PropTypes.array,
  setChosenJobFunc: React.PropTypes.func,
  clearOutChosenJobFunc: React.PropTypes.func,
};

export default Search;
