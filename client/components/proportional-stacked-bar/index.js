import React, { Component } from 'react';

class ProportionalStackedBarChart extends Component {
  componentDidMount() {
    window.addEventListener('scroll', () => {
      const containerHeight = document.querySelector('#bar__personalizedResults--wrapper').getBoundingClientRect().bottom - document.querySelector('#bar__personalizedResults--wrapper').getBoundingClientRect().top;
      const containerPosition = document.querySelector('#bar__personalizedResults--wrapper').offsetTop + containerHeight;

      if (window.scrollY > containerPosition - 130) {
        document.querySelector('#bar__personalizedResults--container').classList.add('tacked');
      } else {
        document.querySelector('#bar__personalizedResults--container').classList.remove('tacked');
      }
    });
  }

  render() {
    const bars = this.props.data.map((d) => {
      const yesStyles = {
        left: 0,
        width: `${((d.data.yes * 100) / d.data.numJobActivities)}%`,
      };

      const sometimesStyles = {
        left: `${((d.data.yes * 100) / d.data.numJobActivities)}%`,
        width: `${((d.data.sometimes * 100) / d.data.numJobActivities)}%`,
      };

      const noStyles = {
        left: `${(((d.data.yes + d.data.sometimes) * 100) / d.data.numJobActivities)}%`,
        width: `${((d.data.no * 100) / d.data.numJobActivities)}%`,
      };

      const barKey = (<div>
        <div style={yesStyles} className="bar-key">Yes</div>
        <div style={sometimesStyles} className="bar-key">Sometimes</div>
        <div style={noStyles} className="bar-key">No</div>
      </div>);

      return (<div className="bar-container" id={`bar__${d.key}--wrapper`}>
        <div id={`bar__${d.key}--container`}>
          <label htmlFor={`bar__${d.key}`}>{d.label}:</label>
          { d.key === 'allOccupationsResults' ? barKey : null }
          <div id={`bar__${d.key}`} className="bar">
            <div id={`bar__${d.key}-yes`} className="bar-segment bar-yes" style={yesStyles} />
            <div id={`bar__${d.key}-sometimes`} className="bar-segment bar-sometimes" style={sometimesStyles} />
            <div id={`bar__${d.key}-no`} className="bar-segment bar-no" style={noStyles} />
          </div>
          { (d.data.numJobActivities && d.key === 'personalizedResults' ? (<p><b>{d.data.yes}</b> of {d.data.numJobActivities} could be done by a robot.</p>) : null) }
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
