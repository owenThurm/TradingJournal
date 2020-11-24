import React from 'react';
import { Modal, Button, Input } from 'antd';
import { Table, Tag, Space } from 'antd';
import AddTrade from './AddTrade';

class Journal extends React.Component {

  constructor(props) {
    super(props);
    this.dataSource = [
      {
        key: '1',
        tradeNum: 1,
        instrument: 'EURUSD',
        strategy: 'Break and Restest',
        buyOrSell: 'Buy',
        quantity: 1.0,
        entry: 1.18,
        exit: 1.80,
        takeProfit: 1.80,
        stopLoss: 1.01,
        riskPercentage: 2,
        fees: 0,
        gain: 120,
        hitOrigTP: 'YES',
      },
      {
        key: '2',
        name: 'John',
        age: 42,
        address: '10 Downing Street',
      },
    ];

    this.columns =  [
      {
        title: '#',
        dataIndex: 'tradeNum',
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


 
  
  
  

  render() {
    return(
      <div>
        <p>Journal</p>
        <AddTrade />
        <br/>
        <Table dataSource={this.dataSource} columns={this.columns} />
      </div>
    )
  }
}
export default Journal;