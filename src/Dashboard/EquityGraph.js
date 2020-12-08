import React from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';

class EquityGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'Alec',
      equity: [],
      //Exit dates of trades
      labels: [],

    };
  }

  async componentDidMount() {
    //Axios Get Trades -> set state

    var trader = await axios.get('/' + this.state.username);
    var trades = trader.data.trader[0].trades;

    //For every new date ->
    //store date in labels, if not already stored
    //sum the gain/loss over that date,
    //push the sum into the equity.
    var latestDate = 0;
    var dailySum = 0;
    var equityList = this.state.equity;
    var labelList = this.state.labels;

    for(var i=0; i<trades.length; i++) {
      var trade = trades[i];
      trade.exitDate = new Date(trade.exitDate);
      dailySum += trade.profit;
      trade.exitDate.setHours(0, 0, 0, 0);
      if(latestDate == 0 || trade.exitDate.getTime() > latestDate.getTime()) {
        labelList.push(trade.exitDate.toString().slice(0,15));
        equityList.push(dailySum);
        latestDate = trade.exitDate;
      } else {
        equityList.pop();
        equityList.push(dailySum);
      }
    }

    this.setState({
      labels: labelList,
      equity: equityList
    });

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

  //Maps dates to integers
  mapDate = (date) => {
    var dateList = date.slice(0,10).split('-');
    return dateList[0] * 365 + dateList[1] * 30 + dateList[2];
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