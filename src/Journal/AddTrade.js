import React from 'react';
import { Modal, Button, Input, Select, InputNumber,
   Row, Col, Form, Card, DatePicker, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
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
        comments: this.state.comments ? this.state.comments : ""
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
      this.clearFields();
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
              <Card title='General Trade Data' style={{ width: 250, height:235}}>
                <Row gutter={[0, 30]}>
                  <DatePicker placeholder={'Entry Date'} style={{width: 250}}
                  onChange={event => { this.handleUpdate(event, 'entryDate')}}
                  />
                </Row>
                <Row gutter={[0, 20]}>
                  <Input placeholder={'Instrument'} onChange={
                    (event) => { this.handleUpdate(event, 'instrument'); }
                    }/>
                </Row>
                <Row gutter={[0, 10]}>
                  <Input placeholder={'setup'} onChange={
                    event => { this.handleUpdate(event, 'setup'); }
                  }/>
                </Row>
                <Row gutter={[0, -10]}>
                  <Switch style={{width: 300}}
                  checkedChildren={
                  <div>
                    Buy <CheckOutlined />
                  </div>}
                  unCheckedChildren={
                    <div>
                      Sell <CloseOutlined />
                    </div>
                  } defaultChecked
                  onChange={ event => { this.handleUpdate(event, 'buyOrSell'); }
                  }/>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card title='Trade Entry' style={{ width: 250, height: 235 }}>
                <Row gutter={[0, 30]}>
                  <Input placeholder={'Entry Price'}
                  onChange={ event => { this.handleUpdate(event, 'entryPrice') }
                  }/>
                </Row>
                <Row gutter={[0, 20]}>
                  <Input placeholder={'Quantity'}
                  onChange={ event => { this.handleUpdate(event, 'quantity') }
                  }/>
                </Row>
                <Row gutter={[0,10]}>
                  <Input placeholder={'Stop Loss'}
                  onChange={ event => { this.handleUpdate(event, 'stopLoss') }
                  }/>
                </Row>
                <Row gutter={[0,0]}>
                  <Input placeholder={'Take Profit'}
                  onChange={ event => { this.handleUpdate(event, 'takeProfit') }
                  }/>
                </Row>
              </Card>
            </Col>
            <Col>
              <Card title='Trade Exit' style={{ width: 250, height: 235}}>
                <Row gutter={[0, 30]}>
                  <DatePicker placeholder={'Exit Date'} style={{width:300}}
                  onChange={ event => { this.handleUpdate(event, 'exitDate') }
                }/>
                </Row>
                <Row gutter={[0, 20]}>
                  <Input placeholder={'Exit Price'}
                  onChange={ event => { this.handleUpdate(event, 'exitPrice') }
                  }/>
                </Row>
                <Row gutter={[0,10]}>
                  <Input placeholder={'Proft/Loss'}
                  onChange={ event => { this.handleUpdate(event, 'profit') }
                  }/>
                </Row>
                <Row gutter={[0,0]}>
                  <Input placeholder={'Fees'}
                  onChange={ event => { this.handleUpdate(event, 'fees') }
                  }/>
                </Row>
              </Card>
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