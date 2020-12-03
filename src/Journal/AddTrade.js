import React from 'react';
import { Modal, Button, Input, Select, InputNumber,
   Row, Col, Form, Card, DatePicker, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import GeneralTradeData from './GeneralTradeData';
import TradeEntry from './TradeEntry';
import TradeExit from './TradeExit';
import axios from 'axios';

class AddTrade extends React.Component {
  formRef = React.createRef();


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
      console.log('about to validate');
      console.log(this.formRef);
      this.formRef.current.validateFields().then(values => {
        this.formRef.current.resetFields();
        console.log('reset fields');
        this.setState({visible: false});
      }).catch(err => {
        console.log(err);
      });
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

  ADatePicker = () => {
      return(
        <div>
          <DatePicker />
        </div>
      );
  }


  render() {

    console.log(this.formRef);

    return(
      <div>
        <Button onClick={this.showModal.bind(this)}>
            Add Trade
        </Button>

        <Modal title="Create Trade Entry"
        visible={this.state.visible}
        onOk={this.handleSubmitTrade.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        width={820}>
          <Form ref={this.formRef} >
            <Row gutter={[10, 10]}  justify="center">
              <Col>
                <Card title='General Trade Data' style={{ width: 250, height:235}}>
                  <Row gutter={[0, 30]}>

                    {/*}
                    <Form.item>
                    { getFieldDecorator('date_1', {}) (<DatePicker format={'DD/MM/YYYY'} /> )}
                    </Form.item>
                    */}



                    <DatePicker placeholder={'Entry Date'} style={{width: 250}}
                    onChange={event => { this.handleUpdate(event, 'entryDate')}}
                    />

                  </Row>
                  <Row gutter={[0, 20]}>
                    <Form.Item name="Instrument" rules={[{
                      required: true,
                      message: 'Input a description for Instrument!'
                      }]}
                      style={{width: 500, marginBottom: 0 }}>
                      <Input placeholder={'Instrument'} onChange={
                        (event) => { this.handleUpdate(event, 'instrument'); }
                        }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0, 10]}>
                    <Form.Item name="setup" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                        <Input placeholder={'setup'} onChange={
                          event => { this.handleUpdate(event, 'setup'); }
                        }/>
                    </Form.Item>
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
                  <Form.Item name="entryPrice" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Entry Price'}
                    onChange={ event => { this.handleUpdate(event, 'entryPrice') }
                    }/>
                  </Form.Item>
                  </Row>
                  <Row gutter={[0, 20]}>
                      <Form.Item name="quantity" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Quantity'}
                    onChange={ event => { this.handleUpdate(event, 'quantity') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,10]}>
                  <Form.Item name="stopLoss" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Stop Loss'}
                    onChange={ event => { this.handleUpdate(event, 'stopLoss') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,0]}>
                  <Form.Item name="takeProfit" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Take Profit'}
                    onChange={ event => { this.handleUpdate(event, 'takeProfit') }
                    }/>
                    </Form.Item>
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
                  <Form.Item name="exitPrice" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Exit Price'}
                    onChange={ event => { this.handleUpdate(event, 'exitPrice') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,10]}>
                  <Form.Item name="profit" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Proft/Loss'}
                    onChange={ event => { this.handleUpdate(event, 'profit') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,0]}>
                  <Form.Item name="fees" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
                    <Input placeholder={'Fees'}
                    onChange={ event => { this.handleUpdate(event, 'fees') }
                    }/>
                    </Form.Item>
                  </Row>
                </Card>
              </Col>
            </Row>
            <h3>Trade Comments</h3>
            <Input placeholder="Got stopped out should play around with stop placement."
            onChange={ event => { this.handleUpdate(event, 'comments') }
            }/>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default AddTrade;