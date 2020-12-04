import React from 'react';
import { Chart } from 'chart.js';

class EquityGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Alec',
      equity: [10, 500, 100, 56, 47, 88, 130],
      //Exit dates of trades
      labels: ['10-1-20', '10-2-20'],

    };
  }

  componentDidMount() {
    //Axios Get Trades -> set state

    //For every new date ->
    //store date in labels,
    //sum the gain/loss over that date,
    //push the sum into the equity.

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