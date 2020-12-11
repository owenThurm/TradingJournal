import React from 'react';
import AddTrade from './AddTrade';
import axios from 'axios';
import TradeTable from './TradeTable';

class Journal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'Alec',
      trades: [],
      setups: []
    }
  }

  componentDidMount = () => {
    this.refreshTrades();
    //AXIOS GET -> IF empty set to default setups
    axios({
      method: 'GET',
      url: '/'+ this.state.username + '/setups',
    }).then(response => {
      console.log(response);
      this.setState({
        setups: response.data.setups
      });
    }).catch(err => {
      console.log('Error>>>', err);
    });
  }

  refreshTrades = async () => {
    var trader = await axios.get('/'+this.state.username);
    trader = trader.data.trader[0];
    if(trader.trades) {

      var trades = trader.trades.filter(trade => !trade.isTransaction);

      var i = trades.length;

      trades = trades.reverse().map(trade => {
          return {
            key: trade.tradeID,
            entryDate: trade.entryDate.slice(0,10),
            exitDate: trade.exitDate.slice(0,10),
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
            comments: trade.comments,
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
        <AddTrade setups={this.state.setups} onNewTrade={() => {
          this.refreshTrades();
          } }/>
        <br/>
        <TradeTable setups={this.state.setups} username={this.state.username} trades={this.state.trades} onSubmit={this.refreshTrades}/>
      </div>
    )
  }
}
export default Journal;