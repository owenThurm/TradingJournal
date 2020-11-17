import React from 'react';

class EquityGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graph: 'graph here'
    };
  }

  render() {
    return(
      <div className="EquityGraph">
        {this.state.graph}
      </div>
    )
  };
}

export default EquityGraph;