import React from 'react';
import { Modal, Button, Input, Select, InputNumber, Row, Col } from 'antd';

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
            <Row gutter={[10, 16]}>
              <Col>
                <Input placeholder={'Instrument'} />
              </Col>
              <Col>
                <Input placeholder={'Strategy'} />
              </Col>
              <Col>
                <Select defaultValue='Buy'>
                  <Select value='Buy'>Buy</Select>
                  <Select value='Sell'>Sell</Select>
                </Select>
              </Col>
              <Col>
                Quantity: <InputNumber min={0} max={9999999999} />
              </Col>
              <Col>
                Entry Price: <InputNumber min={0} max={9999999999} />
              </Col>
              <Col>
                Risk Percentage: <InputNumber min={0} max={100} />
              </Col>
              <Col>
                Take Profit Price: <InputNumber min={0} max={9999999999} />
              </Col>
              <Col>
                Stop Loss Price: <InputNumber min={0} max={9999999999} />
              </Col>
              <Col>
                Exit Price: <InputNumber min={0} max={9999999999} />
              </Col>
              <Col>
                Risk Reward Realized: <InputNumber min={0} max={100} />
              </Col>
              <Col>
                Original Take Profit Hit: <Select defaultValue='Yes'>
                  <Select value='Yes'>Yes</Select>
                  <Select value='No'>No</Select>
                </Select>
              </Col>

            </Row>
          </Modal>
      </div>
    )
  }
}

export default AddTrade;