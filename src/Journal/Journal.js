import React from 'react';
import { Table } from 'antd';
import AddTrade from './AddTrade';
import axios from 'axios';
import TradeTable from './TradeTable';

class Journal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'Alec',
      trades: []
    }
  }

  componentDidMount = () => {
    this.refreshTrades();
  }

  refreshTrades = async () => {
    var trader = await (await axios.get('/'+this.state.username)).data.trader[0];
    console.log(trader);
    if(trader.trades) {

      var trades = trader.trades.filter(trade => !trade.isTransaction);

      var i = trades.length;

      trades = trades.reverse().map(trade => {
          return {
            key: i--,
            instrument: trade.instrument,
            strategy: trade.setup,
            buyOrSell: trade.buyOrSell ? 'BUY' : 'SELL',
            quantity: trade.quantity,
            entry: trade.entryPrice,
            exit: trade.exitPrice,
            takeProfit: trade.takeProfit,
            stopLoss: trade.stopLoss,
            riskPercentage: '???',
            fees: trade.fees,
            gain: trade.profit,
            hitOrigTP: this.checkIfTakeProfitHit(trade) ? "YES" : "NO"
        }
      });
    }
    this.setState({
      trades: trades
    });
  }

  /**
   * Verifies whether the user's take profit was hit.
   *
   * @param {trade} the given trade the look at
   * @return true if take profit was hit, false otherwise.
   */
  checkIfTakeProfitHit(trade) {

    // Handle buy case
    // Exit should be equal to or higher than exit price
    if (trade.buyOrSell) {
      return trade.exitPrice >= trade.takeProfit;
    }
    // Handle sell case
    // Exit should be equal to or less than exit price
    else {
      return trade.exitPrice <= trade.takeProfit;
    }
  }

  render() {
    return(
      <div style={{margin: "20px"}}>
        <AddTrade onNewTrade={() => {
          this.refreshTrades();
          } }/>
        <br/>
        <TradeTable trades={this.state.trades}/>
      </div>
    )
  }
}
export default Journal;