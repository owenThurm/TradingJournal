import React from 'react';

import { Modal, Card, Button, Upload, Input }  from 'antd';
import { beforePictureUpload } from '../utils';
import axios from 'axios';

const { TextArea } = Input;

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: props.username,
      visible: props.visible,
      trade: props.trade
    }
  }

  onSubmit = () => {

    let newTrade = {
      entryDate: this.state.trade.entryDate,
      exitDate: this.state.trade.exitDate,
      instrument: this.state.trade.instrument,
      setup: this.state.trade.setup,
      buyOrSell: this.state.trade.buyOrSell == 'BUY',
      quantity: this.state.trade.quantity,
      entryPrice: this.state.trade.entryPrice,
      exitPrice: this.state.trade.exitPrice,
      takeProfit: this.state.trade.takeProfit,
      stopLoss: this.state.trade.stopLoss,
      fees: this.state.trade.fees,
      profit: this.state.trade.profit,
      comments: this.state.trade.comments,
      isTransaction: false,
      screenshot: this.state.trade.screenshot,
    }

    //AXIOS POST TRADE
    axios({
      method: 'POST',
      url: '/' + this.state.username + '/' + this.state.trade.key + '/updatetrade',
      data: newTrade
    }).then(response => {
      console.log(response);
      console.log(this.state);
      this.props.onCancel();
    }).catch(err => {
      console.log(err);
    });
  }

  updateComment = (event) => {
    let newtrade = {...this.state.trade};
    newtrade.comments = event.target.value;
    this.setState({
      trade: newtrade
    });
  }

  stateScreenshotCallback = (response) => {
    console.log(response);
    let newtrade = {...this.state.trade};
    newtrade.screenshot = response;
    this.setState({
      trade: newtrade
    });
  }

  beforeUpload = (event) => {
    beforePictureUpload(event, this.stateScreenshotCallback);
  }

  render() {
    console.log('re render', this.state)
    return(
      <Modal width={1000} visible={this.state.visible}
            onOk={this.onSubmit}
            onCancel={this.props.onCancel}>
              {/* Render image from record.screenshot  */}
              <Card title='Screen Shot'>
                <img src={this.state.trade.screenshot} style={{width: 900}}/>
              </Card>
              <Card title='Comments'>
                <TextArea value={this.state.trade.comments} onChange={this.updateComment}/>
              </Card>
              <Upload beforeUpload={this.beforeUpload}>
                <Button style={{marginLeft: 20}}> Re-Upload Trade </Button>
              </Upload>

            </Modal>
    );
  }
}

export default CommentModal;