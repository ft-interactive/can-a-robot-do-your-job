import React, { Component } from 'react';

class ProportionalStackedBarChart extends Component {
  render() {
    const bars = this.props.data.map((d) => {
      const yesStyles = {
        left: 0,
        width: `${((d.data.yes * 100) / d.data.numJobActivities)}%`,
      };

      const noStyles = {
        left: `${((d.data.yes * 100) / d.data.numJobActivities)}%`,
        width: `${((d.data.no * 100) / d.data.numJobActivities)}%`,
      };

      const sometimesStyles = {
        left: `${(((d.data.yes + d.data.no) * 100) / d.data.numJobActivities)}%`,
        width: `${((d.data.sometimes * 100) / d.data.numJobActivities)}%`,
      };

      return (<div className="bar-container">
        <label htmlFor={`bar__${d.key}`}>{d.label}:</label>
        <div id={`bar__${d.key}`} className="bar">
          <div id={`bar__${d.key}-yes`} className="bar-segment bar-yes" style={yesStyles} />
          <div id={`bar__${d.key}-no`} className="bar-segment bar-no" style={noStyles} />
          <div id={`bar__${d.key}-sometimes`} className="bar-segment bar-sometimes" style={sometimesStyles} />
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
