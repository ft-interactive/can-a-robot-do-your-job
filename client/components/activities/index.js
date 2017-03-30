import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      activities: nextProps.activities,
    });
  }

  render() {
    const activities = Object.keys(this.state.activities).map((activityName, i) => {
      return (<fieldset className="o-forms">
        <input type="checkbox" name={`checkbox${i}`} value="1" className="o-forms__checkbox" id={`checkbox${i}`} />
        <label htmlFor={`checkbox${i}`} className="o-forms__label"><p>{activityName}</p></label>
      </fieldset>);
    });

    return (
      <div id="activities-container">
        <div className="step-number o-forms__prefix">3</div>
        <h2 className="o-typography-heading2">How much of my job could a robot do?</h2>
        <p id="activities-container__instructions">Select all activities that apply.</p>
        {activities}
      </div>
    );
  }
}

Activities.propTypes = {
  activities: React.PropTypes.object,
};

export default Activities;
