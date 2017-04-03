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

  componentDidMount() {
    document.addEventListener('resetEvent', () => {
      console.log('reset here');

      const checkedBoxes = document.querySelectorAll('#activities-container .o-forms__checkbox[checked="checked"]');
      Array.from(checkedBoxes).forEach((check) => {
        check.removeAttribute('checked');
      });

      this.setState({
        selectedActivities: {},
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    const activityKeys = Object.keys(nextProps.activities);

    const transformedActivities = activityKeys.map((activity) => {
      return {
        key: activity,
        automatable: true,
        details: nextProps.activities[activity],
      };
    }).sort((a, b) => b.details.length - a.details.length);

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
      return (<fieldset className="o-forms" key={`${this.props.chosenJobId}-${activity.key}`}>
        <input type="checkbox" name={`checkbox${i}`} value={activity.key} className="o-forms__checkbox" id={`checkbox${i}`} onChange={event => this.updateSelectedActivities(event.target)} />
        <label htmlFor={`checkbox${i}`} className="o-forms__label"><p>{activity.key}</p></label>
      </fieldset>);
    });

    const pagination = (<div className="o-buttons__pagination">
      <button className="o-buttons o-buttons--big o-buttons-icon o-buttons-icon--arrow-left o-buttons-icon--icon-only" disabled><span className="o-buttons-icon__label">Fewer results</span></button>
      <button className="o-buttons o-buttons--big" aria-pressed="true">1</button>
      <button className="o-buttons o-buttons--big">2</button>
      <button className="o-buttons o-buttons--big">3</button>
      <span className="faux-inline-block"> ... </span>
      <button className="o-buttons o-buttons--big">25</button>
      <button className="o-buttons o-buttons--big">26</button>
      <button className="o-buttons o-buttons--big">27</button>
      <button className="o-buttons o-buttons--big o-buttons-icon o-buttons-icon--arrow-right o-buttons-icon--icon-only"><span className="o-buttons-icon__label">More results</span></button>
    </div>);

    return (
      <div id="activities-container">
        <div className="step-number o-forms__prefix">3</div>
        <h2 className="o-typography-heading2">Which activities do you do?</h2>
        <p id="activities-container__instructions" />
        {activities}
        {pagination}
      </div>
    );
  }
}

Activities.propTypes = {
  activities: React.PropTypes.object,
  updatePersonalActivitiesFunc: React.PropTypes.func,
  chosenJobId: React.PropTypes.string,
};

export default Activities;
