import React, { Component } from 'react';

class Search extends Component {
  render() {
    const dropdownIndustry = (<select>
      <option>Industry 1</option>
    </select>);

    const dropdownOccupation = (<select>
      <option>Occupation 1</option>
    </select>);

    return (
      <div id="search-container">
        <input type="text" placeholder="Enter your occupation here..." />

        <div id="category-container">
          {dropdownIndustry}
          {dropdownOccupation}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  data: React.PropTypes.array,
};

export default Search;
