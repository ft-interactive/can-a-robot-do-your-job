import React, { Component } from 'react';

class ProportionalStackedBarChart extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const reactContainerOffset = document.querySelector('#react-container').offsetTop;
      const containerHeight = document.querySelector('#bar__personalizedResults--wrapper').getBoundingClientRect().bottom - document.querySelector('#bar__personalizedResults--wrapper').getBoundingClientRect().top;
      const containerPosition = document.querySelector('#bar__personalizedResults--wrapper').offsetTop + containerHeight;

      if (window.scrollY > containerPosition + (reactContainerOffset - 130)) {
        document.querySelector('#bar__personalizedResults--container').classList.add('tacked');
      } else {
        document.querySelector('#bar__personalizedResults--container').classList.remove('tacked');
      }
    });
  }

  render() {
    const bars = this.props.data.map((d) => {
      const yesVal = d.data.yes || 0;
      const sometimesVal = d.data.sometimes || 0;
      const noVal = d.data.no || 0;
      const numJobActivitiesVal = d.data.numJobActivities || 0;

      const yesStyles = {
        left: 0,
        width: (numJobActivitiesVal !== 0 ? `${((yesVal * 100) / numJobActivitiesVal)}%` : 0),
      };

      const sometimesStyles = {
        left: (numJobActivitiesVal !== 0 ? `${((yesVal * 100) / numJobActivitiesVal)}%` : 0),
        width: (numJobActivitiesVal !== 0 ? `${((sometimesVal * 100) / numJobActivitiesVal)}%` : 0),
      };

      const noStyles = {
        left: (numJobActivitiesVal !== 0 ? `${(((yesVal + sometimesVal) * 100) / numJobActivitiesVal)}%` : 0),
        width: (numJobActivitiesVal !== 0 ? `${((noVal * 100) / numJobActivitiesVal)}%` : 0),
      };

      const barKey = (<div>
        <div style={yesStyles} className="bar-key">Yes</div>
        <div style={sometimesStyles} className="bar-key">Sometimes</div>
        <div style={noStyles} className="bar-key">No</div>
      </div>);

      const mobileKey = (<div id="mobileKey">
        <span id="mobileKey__label">Could a robot do this?</span>
        <div className="mobileKeyItem" id="mobileKey__yes">Yes</div>
        <div className="mobileKeyItem" id="mobileKey__sometimes">Sometimes</div>
        <div className="mobileKeyItem" id="mobileKey__no">No</div>
      </div>);

      return (<div className="bar-container" id={`bar__${d.key}--wrapper`} key={d.key}>
        <div id={`bar__${d.key}--container`}>
          <div className="bar__label">
            <label htmlFor={`bar__${d.key}`}>{d.label}:</label>
            { (d.data.numJobActivities && d.key === 'personalizedResults' ? (<span id="myProgressNumber">of {d.data.numJobActivities} activities selected</span>) : null) }
            { d.key === 'allOccupationsResults' ? barKey : null }
          </div>
          <div id={`bar__${d.key}`} className="bar">
            <div id={`bar__${d.key}-yes`} className="bar-segment bar-yes" style={yesStyles} />
            <div id={`bar__${d.key}-sometimes`} className="bar-segment bar-sometimes" style={sometimesStyles} />
            <div id={`bar__${d.key}-no`} className="bar-segment bar-no" style={noStyles} />
          </div>
          { d.key === 'personalizedResults' ? mobileKey : null }
        </div>
      </div>);
    });

    return (
      <div id="bar-wrapper">
        {bars}
      </div>
    );
  }
}

ProportionalStackedBarChart.propTypes = {
  data: React.PropTypes.array,
};

export default ProportionalStackedBarChart;
