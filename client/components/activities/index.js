import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      industries: nextProps.industries,
    });
  }

  render() {
    return (
      <div id="activities-container">
        <h2 className="o-typography-heading2">How much of my job could a robot do?</h2>
      </div>
    );
  }
}

Activities.propTypes = {
};

export default Activities;
