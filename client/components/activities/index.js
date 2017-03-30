import React, { Component } from 'react';

class Activities extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      industries: nextProps.industries,
    });
  }

  render() {
    const activities = () => {
      return (<fieldset className="o-forms">
        <input type="checkbox" name="checkbox51" value="1" className="o-forms__checkbox" id="checkbox51" checked />
        <label htmlFor="checkbox51" className="o-forms__label"><p>I confirm I have read and agree to the terms &amp; conditions, privacy policy and cookie policy*.</p></label>
      </fieldset>);
    };

    return (
      <div id="activities-container">
        <div className="step-number o-forms__prefix">3</div>
        <h2 className="o-typography-heading2">How much of my job could a robot do?</h2>
        <p id="activities-container__instructions">Select all activities that apply.</p>
        {activities()}
      </div>
    );
  }
}

Activities.propTypes = {
};

export default Activities;
