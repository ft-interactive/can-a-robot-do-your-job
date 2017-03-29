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

  render() {
    const dropdownIndustry = this.state.industries.map((industry) => {
      return (<option value={industry.id.split('-')[0]}>{industry.major_group_title}</option>)
    });

    const dropdownOccupation = this.state.jobs.map((industry) => {
      return (<option>{industry.minor_group_title}</option>)
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
          <div className="category-dropdowns">
            <div className="step-number">1</div>
            <label htmlFor="dropdownIndustry">Pick an industry</label>
            <select onChange={event => this.getJobsList(event.target.value)} id="dropdownIndustry">
              <option>Pick an industry</option>
              {dropdownIndustry}
            </select>
          </div>
          <div className="category-dropdowns">
            <div className="step-number">2</div>
            <label htmlFor="dropdownOccupation">Pick a job</label>
            <select disabled={dropdownOccupation.length <= 0} id="dropdownOccupation">
              <option>Pick a job</option>
              {dropdownOccupation}
            </select>
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  industries: React.PropTypes.array,
};

export default Search;
