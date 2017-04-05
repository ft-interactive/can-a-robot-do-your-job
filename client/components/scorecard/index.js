import React, { Component } from 'react';

class Scorecard extends Component {
  render() {
    const yesVal = this.props.score.yes || 0;
    const numJobActivitiesVal = this.props.score.numJobActivities || 0;

    let verdict = 'Tell us what activities you do above to get your score.';
    if (numJobActivitiesVal > 0) {
      if ((yesVal / numJobActivitiesVal) > 0.5) {
        verdict = 'Time to retrain?';
      } else {
        verdict = 'You might be safe... for now.';
      }
    }

    const verdictStyle = {
      visibility: (numJobActivitiesVal > 0 ? 'visible' : 'hidden'),
    }

    const scorecardScore = (<div id="scorecard__score">
      <img src="./images/robot.jpg" alt="" />
      <div id="scorecard__score-text">
        <div id="scorecard__stats">{yesVal} out of {numJobActivitiesVal}</div>
        <div id="scorecard__line2">of your work activities could be automated</div>
        <div id="scorecard__verdict">
          <div id="scorecard__verdict-label" style={verdictStyle}>Verdict:</div>
          {verdict}
        </div>
      </div>
    </div>);

    return (<div id="scorecard-container">
      <div className="step-number o-forms__prefix">4</div>
      <h2 className="o-typography-heading2">How robot-proof is your job?</h2>
      {(this.props.chosenJobName ? scorecardScore : null)}
    </div>
    );
  }
}

Scorecard.propTypes = {
  score: React.PropTypes.object,
  chosenJobName: React.PropTypes.string,
};

export default Scorecard;
