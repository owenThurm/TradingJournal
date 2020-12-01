import React from 'react';
import { Modal, Button, Input } from 'antd';
import { Table, Tag, Space } from 'antd';
import AddTrade from './AddTrade';
import axios from 'axios';

class Journal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: 'sabine',
      trades: []
    }
    this.columns =  [
      {
        title: '#',
        dataIndex: 'key',
      },
      {
        title: 'Instrument',
        dataIndex: 'instrument',
      },
      {
        title: 'Strategy',
        dataIndex: 'strategy',
      },
      {
        title: 'Buy/Sell',
        dataIndex: 'buyOrSell',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
      },
      {
        title: 'Entry Price',
        dataIndex: 'entry',
      },
      {
        title: 'Exit Price',
        dataIndex: 'exit',
      },
      {
        title: 'Take Profit',
        dataIndex: 'takeProfit',
      },
      {
        title: 'Stop Loss',
        dataIndex: 'stopLoss',
      },
      {
        title: 'Risk %',
        dataIndex: 'riskPercentage',
      },
      {
        title: 'Fees',
        dataIndex: 'fees',
      },
      {
        title: 'Gain $',
        dataIndex: 'gain',
      },
      {
        title: 'Original TP Hit',
        dataIndex: 'hitOrigTP',
      },
    ];
  }

  componentDidMount = () => {
    this.refreshTrades();
  }

  refreshTrades = () => {
    axios.get('/'+this.state.username).then(response => {
      var trader = response.data.trader[0];
      if(trader.trades) {

        var trades = trader.trades.reverse().map(trade => {
          return {
            key: trade.tradeID,
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
            gain: '???',
            hitOrigTP: '???'
          }
        });
      }
      this.setState({
        trades: trades
      });
    }).catch(err => {
      console.log(err);
    });
  }


  render() {
    return(
      <div style={{margin: "20px"}}>
        <p>Journal</p>
        <AddTrade onNewTrade={() => {
          this.refreshTrades();
          } }/>
        <br/>
        <Table dataSource={this.state.trades} columns={this.columns}/>
      </div>
    )
  }
}
export default Journal;