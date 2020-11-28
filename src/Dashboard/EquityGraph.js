import React from 'react';
import { Chart } from 'chart.js';

class EquityGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      equity: [100, 200, 90, 50, 10, 40, 30],
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],

    };
  }

  componentDidMount() {
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.state.labels,
        datasets: [{
          label: "Equity",
          fill: false,
          borderColor: 'lightgreen',
          pointBackgroundColor: 'white',
          data: this.state.equity,
        }],

      },
    });

  }


  render() {
    return (
      <div className="EquityGraph" style={{ width: 400, height: 200 }}>
        <canvas id="myChart" width="300" height="300"></canvas>
        {this.state.graph}
      </div>
    )
  };
}

export default EquityGraph;