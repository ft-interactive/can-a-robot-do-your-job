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
      <div>
        <input type="text" />
        {dropdownIndustry}
        {dropdownOccupation}
      </div>
    );
  }
}

Search.propTypes = {
  data: React.PropTypes.array,
};

export default Search;
