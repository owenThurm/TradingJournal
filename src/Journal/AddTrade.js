import React from 'react';
import { Modal, Button, Input, Select, InputNumber, Row, Col } from 'antd';
import GeneralTradeData from './GeneralTradeData';
import TradeEntry from './TradeEntry';
import TradeExit from './TradeExit';

class AddTrade extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      entryDate: null,
      instrument: null,
      setup: null,
      buyOrSell: null,
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





    this.setState({
      visible: false
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  handleUpdate = (update, type) => {
      var value = update.target.value;
      this.setUpdate(type, value);
      console.log(this.state);
  }

  setUpdate = (type, value) => {
    switch(type) {
      case 'entryDate':
        this.setState({
          entryDate: value
        });
        break;
      case 'instrument':
        this.setState({
          instrument: value
        });
        break;
      case 'setup':
        this.setState({
          setup: value
        });
        break;
      case 'buyOrSell':
        this.setState({
          buyOrSell: value
        });
        break;
      case 'entryPrice':
        this.setState({
          entryPrice: value
        });
        break;
      case 'quantity':
        this.setState({
          quantity: value
        });
        break;
      case 'stopLoss':
        this.setState({
          stopLoss: value
        });
        break;
      case 'takeProfit':
        this.setState({
          takeProfit: value
        });
        break;
      case 'exitDate':
        this.setState({
          exitDate: value
        });
        break;
      case 'exitPrice':
        this.setState({
          exitPrice: value
        });
        break;
      case 'profit':
        this.setState({
          profit: value
        });
        break;
      case 'fees':
        this.setState({
          fees: value
        });
        break;
      case 'comments':
        this.setState({
          comments: value
        });
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
          <Input placeholder="Got stopped out should play around with stop placement." />
        </Modal>
      </div>
    )
  }
}

export default AddTrade;