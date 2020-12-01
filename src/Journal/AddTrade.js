import React from 'react';
import { Modal, Button, Input, Select, InputNumber, Row, Col } from 'antd';
import GeneralTradeData from './GeneralTradeData';
import TradeEntry from './TradeEntry';
import TradeExit from './TradeExit';
import axios from 'axios';

class AddTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'sabine',
      visible: false,
      entryDate: null,
      instrument: null,
      setup: null,
      buyOrSell: true,
      entryPrice: null,
      quantity: null,
      stopLoss: null,
      takeProfit: null,
      exitDate: null,
      exitPrice: null,
      profit: null,
      fees: null,
      comments: null,
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleSubmitTrade = () => {
    //TODO: POST axios request to our express api.
    //access trade info via state.

    axios({
      method: 'POST',
      url: '/' + this.state.username + '/trade',
      data: {
        entryDate: this.state.entryDate,
        instrument: this.state.instrument,
        setup: this.state.setup,
        entryPrice: this.state.entryPrice,
        quantity: this.state.quantity,
        stopLoss: this.state.stopLoss,
        takeProfit: this.state.takeProfit,
        exitDate: this.state.exitDate,
        exitPrice: this.state.exitPrice,
        profit: this.state.profit,
        fees: this.state.fees,
        buyOrSell: this.state.buyOrSell,
        comments: this.state.comments
      }
    }).then(response => {
      this.setState({
        visible: false,
        entryDate: null,
        instrument: null,
        setup: null,
        buyOrSell: true,
        entryPrice: null,
        quantity: null,
        stopLoss: null,
        takeProfit: null,
        exitDate: null,
        exitPrice: null,
        profit: null,
        fees: null,
        comments: null,
      });
      this.props.onNewTrade();
    }).catch(err => {
      console.log('ERR: ' + err);
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleUpdate = (update, type) => {
    var value = null;
    if(typeof(update) == 'boolean') value = update;
    else if(update._isAMomentObject) value = update._d;
    else value = update.target.value;

    if(value == null) console.log('Unsupported input: ' + type);

    this.setUpdate(type, value);
  }

  setUpdate = (type, value) => {
    switch(type) {
      case 'entryDate':
        this.setState({
          entryDate: value
        }, () => { console.log(this.state)});
        break;
      case 'instrument':
        this.setState({
          instrument: value
        }, () => { console.log(this.state)});
        break;
      case 'setup':
        this.setState({
          setup: value
        }, () => { console.log(this.state)});
        break;
      case 'buyOrSell':
        this.setState({
          buyOrSell: value
        }, () => { console.log(this.state)});
        break;
      case 'entryPrice':
        this.setState({
          entryPrice: value
        }, () => { console.log(this.state)});
        break;
      case 'quantity':
        this.setState({
          quantity: value
        }, () => { console.log(this.state)});
        break;
      case 'stopLoss':
        this.setState({
          stopLoss: value
        }, () => { console.log(this.state)});
        break;
      case 'takeProfit':
        this.setState({
          takeProfit: value
        }, () => { console.log(this.state)});
        break;
      case 'exitDate':
        this.setState({
          exitDate: value
        }, () => { console.log(this.state)});
        break;
      case 'exitPrice':
        this.setState({
          exitPrice: value
        }, () => { console.log(this.state)});
        break;
      case 'profit':
        this.setState({
          profit: value
        }, () => { console.log(this.state)});
        break;
      case 'fees':
        this.setState({
          fees: value
        }, () => { console.log(this.state)});
        break;
      case 'comments':
        this.setState({
          comments: value
        }, () => { console.log(this.state)});
        break;
      default:
        console.log('Invalid input type:' + type);
    }
  }

  render() {

    return(
      <div>
        <Button onClick={this.showModal.bind(this)}>
            Add Trade
        </Button>

        <Modal title="Create Trade Entry"
        visible={this.state.visible}
        onOk={this.handleSubmitTrade.bind(this, 'hello')}
        onCancel={this.handleCancel.bind(this)}
        width={820}>

          <Row gutter={[10, 10]}  justify="center">
            <Col>
              <GeneralTradeData handleChange={this.handleUpdate} />
            </Col>
            <Col>
              <TradeEntry handleChange={this.handleUpdate} />
            </Col>
            <Col>
              <TradeExit handleChange={this.handleUpdate} />
            </Col>
          </Row>
          <h3>Trade Comments</h3>
          <Input placeholder="Got stopped out should play around with stop placement."
          onChange={ event => { this.handleUpdate(event, 'comments') }
          }/>
        </Modal>
      </div>
    )
  }
}

export default AddTrade;