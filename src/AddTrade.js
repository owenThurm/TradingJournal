import React from 'react';
import { Modal, Button, Input, Select, InputNumber, } from 'antd';

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
        riskRewardRealized: null,
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
            <p> Hello Modal </p>
            <Input placeholder={'Instrument'} />
            <Input placeholder={'Strategy'} />
            <Select defaultValue='Buy'>
              <Select value='Buy'>Buy</Select>
              <Select value='Sell'>Sell</Select>
            </Select>
            <InputNumber min={.01} max={1000000} />




          </Modal>
      </div>
    )
  }


}

export default AddTrade;