import React from 'react';

class WeeklyChange extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      change: props.change
    };
  }

  render() {
    return(
      <div className="WeeklyChange">
        {'Weekly Change ' + this.state.change + '%'}
      </div>
    );
  }
}

export default WeeklyChange;