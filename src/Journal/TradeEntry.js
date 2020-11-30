import React from 'react';
import { Card, Input, Row } from 'antd';

class TradeEntry extends React.Component {

  render() {
    return(
      <Card title='Trade Entry' style={{ width: 250, height: 235 }}>
        <Row gutter={[0, 30]}>
          <Input placeholder={'Entry Price'}
          onChange={ event => { this.props.handleChange(event, 'entryPrice') }
          }/>
        </Row>
        <Row gutter={[0, 20]}>
          <Input placeholder={'Quantity'}
          onChange={ event => { this.props.handleChange(event, 'quantity') }
          }/>
        </Row>
        <Row gutter={[0,10]}>
          <Input placeholder={'Stop Loss'}
          onChange={ event => { this.props.handleChange(event, 'stopLoss') }
          }/>
        </Row>
        <Row gutter={[0,0]}>
          <Input placeholder={'Take Profit'}
          onChange={ event => { this.props.handleChange(event, 'takeProfit') }
          }/>
        </Row>
      </Card>
    );
  }


}

export default TradeEntry;