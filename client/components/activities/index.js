import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activities: {},
      transformedActivities: [],
      selectedActivities: {},
      currentPage: 0,
      numPerPage: 8,
    };

    this.changePage = this.changePage.bind(this);
    this.decreasePage = this.decreasePage.bind(this);
    this.increasePage = this.increasePage.bind(this);
  }

  componentDidMount() {
    document.addEventListener('resetEvent', () => {

      this.setState({
        selectedActivities: {},
        currentPage: 0,
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

  changePage(pageNum) {
    this.setState({
      currentPage: parseInt(pageNum.getAttribute('data-pageNum'), 10),
    });
  }

  decreasePage() {
    this.setState({
      currentPage: this.state.currentPage - 1,
    });
  }

  increasePage() {
    this.setState({
      currentPage: this.state.currentPage + 1,
    });
  }

  render() {
    const activities = this.state.transformedActivities.slice(this.state.currentPage * this.state.numPerPage, ((this.state.currentPage + 1) * this.state.numPerPage)).map((activity, i) => {
      return (<fieldset className="o-forms" key={`${this.props.chosenJobId}-${activity.key}`}>
        <input type="checkbox" name={`checkbox${i}`} value={activity.key} className="o-forms__checkbox" id={`checkbox${i}`} checked={(activity.key in this.state.selectedActivities ? 'checked' : '')} onChange={event => this.updateSelectedActivities(event.target)} />
        <label htmlFor={`checkbox${i}`} className="o-forms__label"><p>{activity.key}</p></label>
      </fieldset>);
    });

    // show a button for every page
    // const paginationButtons = [...Array(Math.ceil(this.state.transformedActivities.length / this.state.numPerPage)).keys()].map((i) => {
    //   return (<button className="o-buttons o-buttons--big" key={`pagination-${i}`} data-pageNum={i} aria-pressed={(i === this.state.currentPage ? 'true' : 'false')} onClick={event => this.changePage(event.target)}>{i + 1}</button>);
    // });

    const paginationButtons = (<div id="paginationText">Page <span id="currentPage">{this.state.currentPage + 1}</span> of {Math.ceil(this.state.transformedActivities.length / this.state.numPerPage)}</div>);

    const pagination = (<div className="o-buttons__pagination" id="activities-pagination">
      <button className="o-buttons o-buttons--big o-buttons-icon o-buttons-icon--arrow-left o-buttons-icon--icon-only" disabled={(this.state.currentPage === 0 ? 'disabled' : '')} onClick={() => this.decreasePage()}><span className="o-buttons-icon__label">Previous page</span></button>
      {paginationButtons}
      <button className="o-buttons o-buttons--big o-buttons-icon o-buttons-icon--arrow-right o-buttons-icon--icon-only" disabled={(this.state.currentPage === (Math.ceil(this.state.transformedActivities.length / this.state.numPerPage) - 1) ? 'disabled' : '')} onClick={() => this.increasePage()}><span className="o-buttons-icon__label">Next page</span></button>
    </div>);

    return (
      <div id="activities-container">
        <div className="step-number o-forms__prefix">3</div>
        <h2 className="o-typography-heading2">Which activities do you do?</h2>
        <p id="activities-container__instructions" />
        {activities}
        {(this.state.transformedActivities.length > 0 ? pagination : null)}
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
