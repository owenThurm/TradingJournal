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
      newTrade: {
        instrument: null,
        strategy: null,
        buyOrSell: null,
        quantity: null,
        entryPrice: null,
        risk: null,
        takeProfitPrice: null,
        stopLossPrice: null,
        exitPrice: null,
        fees: null,
        originalTakeProfitHit: null,
        gainOrLoss: null
      }
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
        width={1000}>

          <Row gutter={[10, 0]}>
            <Col>
              <GeneralTradeData />
            </Col>
            <Col>
              <TradeEntry />
            </Col>
            <Col>
              <TradeExit />
            </Col>
          </Row>
        </Modal>
      </div>
    )
  }
}

export default AddTrade;