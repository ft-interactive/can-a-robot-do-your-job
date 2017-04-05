import React, { Component } from 'react';

class Scorecard extends Component {
  render() {
    const yesVal = this.props.score.yes || 0;
    const numJobActivitiesVal = this.props.score.numJobActivities || 0;

    let verdict = 'Tell us what activities you do to get your score.';
    if (numJobActivitiesVal > 0) {
      // exactly one selected
      if (numJobActivitiesVal === 1) {
        if (yesVal === 1) { // exactly one selected + yes
          verdict = 'You had one job.';
        } else { // exactly one selected + not yes
          verdict = 'You have one job.';
        }
      }

      // 2-5 selected
      if (numJobActivitiesVal >= 2 && numJobActivitiesVal <= 5) {
        verdict = '“Variety is the spice of life!”';
      }

      // more than 5 to 20 selected
      if (numJobActivitiesVal > 5 && numJobActivitiesVal <= 20) {
        if (yesVal === 0) {
          verdict = 'Your job is fully robot-proof.';
        } else {
          if ((yesVal / numJobActivitiesVal) < 0.25) {
            verdict = '“Our inventions are wont to be pretty toys, which distract our attention from serious things.” Henry David Thoreau';
          }

          if ((yesVal / numJobActivitiesVal) >= 0.25 && (yesVal / numJobActivitiesVal) <= 0.75) {
            verdict = '“Focus is a matter of deciding what things you\'re not going to do.” John Carmack';
          }

          if ((yesVal / numJobActivitiesVal) > 0.75) {
            verdict = '“It is during our darkest moments that we must focus to see the light.” Aristotle';
          }

          if (yesVal === numJobActivitiesVal) {
            verdict = 'Time to retrain?';
          }
        }
      }

      // if more than 20 activities selected
      if (numJobActivitiesVal > 20) {
        verdict = '“If you chase two rabbits, both will escape.”';
      }
    }

    const verdictStyle = {
      visibility: (numJobActivitiesVal > 0 ? 'visible' : 'hidden'),
    };

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
