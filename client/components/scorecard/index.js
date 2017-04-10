import React, { Component } from 'react';
import gaSendEvent from '../core/ga-analytics';

class Scorecard extends Component {
  constructor(props) {
    super(props);

    this.tweetScore = this.tweetScore.bind(this);
  }

  tweetScore() {
    const eventCategory = this.props.chosenJobName;
    const eventLabel = `${this.props.score.yes || 0}-${this.props.score.numJobActivities || 0}`;
    gaSendEvent(eventCategory, 'dynamicShare', eventLabel);
  }

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
        verdict = 'Remember: “Variety is the spice of life!”';
      }

      // more than 5 to 20 selected
      if (numJobActivitiesVal > 5 && numJobActivitiesVal <= 20) {
        if (yesVal === 0) {
          verdict = 'Congratulations! Your job is fully robot-proof.';
        } else {
          if ((yesVal / numJobActivitiesVal) < 0.25) {
            verdict = 'That\'s pretty good! Your job is mostly robot-proof.';
          }

          if ((yesVal / numJobActivitiesVal) >= 0.25 && (yesVal / numJobActivitiesVal) <= 0.75) {
            verdict = 'As Steve Jobs said, “Innovation is saying no to 1,000 things.”';
          }

          if ((yesVal / numJobActivitiesVal) > 0.75) {
            verdict = '“Only those who constantly retool themselves stand a chance of staying employed in the years ahead.” Tom Peters';
          }

          if (yesVal === numJobActivitiesVal) {
            verdict = '“Hasta la vista, baby!”';
          }
        }
      }

      // if more than 20 activities selected
      if (numJobActivitiesVal > 20) {
        verdict = '“It is possible to be very busy without being very effective.” Stephen Covey';
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

    const tweetText = `${yesVal} out of ${numJobActivitiesVal} of my work activities could be automated. Find out how robot-proof your job is: https://ig.ft.com/can-a-robot-do-your-job/`;
    const tweetURL = `https://twitter.com/home?status=${tweetText}`;

    const scorecardShare = (<div id="scorecard__share">
      <div id="scorecard__share-label"><a href={tweetURL} target="_blank" rel="noreferrer noopener"><button className="o-buttons o-buttons--standout" onClick={() => this.tweetScore()}>Tweet your score</button></a></div>
    </div>);

    const scorecardContainer = (<div id="scorecard-container" aria-disabled={(this.props.chosenJobName ? 'false' : 'true')}>
      <div id="scorecard__contents">
        <h2 className="o-typography-heading2">How robot-proof is your job?</h2>
        {(this.props.chosenJobName ? scorecardScore : null)}
        {(this.props.chosenJobName ? scorecardShare : null)}
      </div>
    </div>
    );

    return (this.props.chosenJobName ? scorecardContainer : null);
  }
}

Scorecard.propTypes = {
  score: React.PropTypes.object,
  chosenJobName: React.PropTypes.string,
};

export default Scorecard;
