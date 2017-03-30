import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: {},
      transformedActivities: [],
      selectedActivities: {},
    };
  }

  componentWillReceiveProps(nextProps) {
    const activityKeys = Object.keys(nextProps.activities);

    const transformedActivities = activityKeys.map((activity) => {
      return {
        key: activity,
        automatable: true,
        details: nextProps.activities[activity],
      };
    });

    this.setState({
      activities: nextProps.activities,
      transformedActivities,
    });
  }

  updateSelectedActivities(checkBoxObj) {
    if (checkBoxObj.checked) {
      // add to selectedActivities
      this.state.selectedActivities[checkBoxObj.value] = this.props.activities[checkBoxObj.value];
    } else {
      // remove from selectedActivities
      delete this.state.selectedActivities[checkBoxObj.value];
    }

    this.props.updatePersonalActivitiesFunc(this.state.selectedActivities);
  }

  render() {
    const activities = this.state.transformedActivities.map((activity, i) => {
      return (<fieldset className="o-forms">
        <input type="checkbox" name={`checkbox${i}`} value={activity.key} className="o-forms__checkbox" id={`checkbox${i}`} onChange={event => this.updateSelectedActivities(event.target)} />
        <label htmlFor={`checkbox${i}`} className="o-forms__label"><p>{activity.key}</p></label>
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
  transformedActivities: React.PropTypes.array,
  updatePersonalActivitiesFunc: React.PropTypes.func,
};

export default Activities;
