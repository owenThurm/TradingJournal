import React from 'react';
import { Modal, Button, Input,
   Row, Col, Form, Card, DatePicker, Switch, Upload, message } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import axios from 'axios';
import { isNumber, beforePictureUpload } from '../utils';
import SetupPicker from './SetupPicker';

class AddTrade extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      username: 'Alec',
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
      screenshot: null,
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleSubmitTrade = () => {
    //POST axios request to our express api.
    //access trade info via state.
    axios({
      method: 'POST',
      url: '/' + this.state.username + '/trade',
      data: {
        entryDate: this.state.entryDate.getMonth()+1+'-'+this.state.entryDate.getDate()+'-'+this.state.entryDate.getFullYear(),
        instrument: this.state.instrument,
        setup: this.state.setup,
        entryPrice: parseFloat(this.state.entryPrice),
        quantity: parseInt(this.state.quantity),
        stopLoss: parseFloat(this.state.stopLoss),
        takeProfit: parseFloat(this.state.takeProfit),
        exitDate: this.state.exitDate.getMonth()+1+'-'+this.state.exitDate.getDate()+'-'+this.state.exitDate.getFullYear(),
        exitPrice: parseFloat(this.state.exitPrice),
        profit: parseFloat(this.state.profit),
        fees: parseFloat(this.state.fees),
        buyOrSell: this.state.buyOrSell,
        comments: this.state.comments ? this.state.comments : "",
        isTransaction: false,
        screenshot: this.state.screenshot,
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
        screenshot: null,
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

  //parses new values for update
  handleUpdate = (update, type) => {
    var value = null;
    if(typeof(update) == 'boolean' || typeof(update) == 'string') value = update;
    else if(update._isAMomentObject) value = update._d;
    else value = update.target.value;

    if(value == null) console.log('Unsupported input: ' + type);

    this.setUpdate(type, value);
  }

  //Switch on type to decide which value to update.
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
        console.log(value);
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
      case 'screenshot':
        this.setState({
          screenshot: value
        }, () => { console.log(this.state)});
        break;
      default:
        console.log('Invalid input type:' + type);
    }
  }

  stateScreenshotCallback = (response) => {
    this.setState({
      screenshot: response
    });
  }

  beforeUpload = (event) => {
    beforePictureUpload(event, this.stateScreenshotCallback);
  }



  render() {
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
            <Row gutter={[10, 45]}  justify="center">
              <Col>
                <Card title='General Trade Data' style={{ width: 250, height:235}}>
                  <Row gutter={[0, 30]}>
                    <Form.Item name="entryDate" rules={[{
                        required: true,
                        message: 'Entry Date Required!'
                        }]} style={{width: 500, marginBottom: 0 }}>
                      <DatePicker placeholder={'Entry Date'} style={{width: 200}}
                      onChange={event => { this.handleUpdate(event, 'entryDate')}}
                      />
                    </Form.Item>
                  </Row>
                  <Row gutter={[0, 20]}>
                    <Form.Item name="Instrument" rules={[{
                      required: true,
                      message: 'Input type of Instrument!'
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
                        message: 'Input description for Setup!'
                        }]} style={{width: 500, marginBottom: 0 }}>
                        <SetupPicker setups={this.props.setups} onChange={event => { this.handleUpdate(event, 'setup')} } style={{width: 100}}/>
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
                        message: 'Input value for Entry Price!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Entry Price'}
                    onChange={ event => { this.handleUpdate(event, 'entryPrice') }
                    }/>
                  </Form.Item>
                  </Row>
                  <Row gutter={[0, 20]}>
                      <Form.Item name="quantity" rules={[{
                        required: true,
                        message: 'Input value for Quantity!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Quantity'}
                    onChange={ event => { this.handleUpdate(event, 'quantity') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,10]}>
                  <Form.Item name="stopLoss" rules={[{
                        required: true,
                        message: 'Input value for Stop Loss!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Stop Loss'}
                    onChange={ event => { this.handleUpdate(event, 'stopLoss') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,0]}>
                  <Form.Item name="takeProfit" rules={[{
                        required: true,
                        message: 'Input value for Take Profit!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
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
                    <Form.Item name="exitDate" rules={[{
                          required: true,
                          message: 'Entry Date Required!'
                          }]} style={{width: 500, marginBottom: 0 }}>
                        <DatePicker placeholder={'Exit Date'} style={{width:200}}
                        onChange={ event => { this.handleUpdate(event, 'exitDate') }
                      }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0, 20]}>
                  <Form.Item name="exitPrice" rules={[{
                        required: true,
                        message: 'Input value for Exit Price!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Exit Price'}
                    onChange={ event => { this.handleUpdate(event, 'exitPrice') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,10]}>
                  <Form.Item name="profit" rules={[{
                        required: true,
                        message: 'Input value for Profit!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Proft/Loss'}
                    onChange={ event => { this.handleUpdate(event, 'profit') }
                    }/>
                    </Form.Item>
                  </Row>
                  <Row gutter={[0,0]}>
                  <Form.Item name="fees" rules={[{
                        required: true,
                        message: 'Input value for fees!',
                        validator: isNumber
                        }]} style={{width: 500, marginBottom: 0 }}>
                    <Input placeholder={'Fees'}
                    onChange={ event => { this.handleUpdate(event, 'fees') }
                    }/>
                    </Form.Item>
                  </Row>
                </Card>
              </Col>
            </Row>
            <h3>Trade Comments</h3>
            <Form.Item name="comments" rules={[{
              required: false
            }]} style={{width: 770, marginBottom: 0 }}>
              <Input placeholder="Got stopped out should play around with stop placement."
              onChange={ event => { this.handleUpdate(event, 'comments') }
              }/>
            </Form.Item>
            <h3>Trade Screenshot</h3>
            <Form.Item name="screenshot" rules={[{
              required: false
            }]}>
              <Upload beforeUpload={this.beforeUpload} action={(file) => {console.log('called', file)}} onChange={this.handleUpload}>
                <Button>Upload</Button>
              </Upload>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
  }
}

export default AddTrade;