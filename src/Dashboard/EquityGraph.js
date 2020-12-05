import React from 'react';
import { Chart } from 'chart.js';
import axios from 'axios';
//import { mapDate } from '../utils';

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
    console.log("trades");
    console.log(trades);


    //For every new date ->
    //store date in labels, if not already stored
    //sum the gain/loss over that date,
    //push the sum into the equity.
    var latestDate = 0;
    var dailySum = trader.data.trader[0].balance;
    var equityList = this.state.equity;
    equityList.push(dailySum)
    var labelList = this.state.labels;
    labelList.push(trades[0].entryDate)

    console.log(trader);

    for(var i=0; i<trades.length; i++) {
      var trade = trades[i];
      dailySum += trade.profit;
      if(this.mapDate(trade.exitDate) > latestDate) {

        labelList.push(trade.exitDate.slice(0,10));
        equityList.push(dailySum);
        latestDate = this.mapDate(trade.exitDate.slice(0,10));

      } else {
        equityList.pop();
        equityList.push(dailySum);
      }
    }

    this.setState({
      labels: labelList,
      equity: equityList
    });

    console.log(this.state);

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