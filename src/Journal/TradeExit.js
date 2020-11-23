import React from 'react';
import { Card, Row, Input, DatePicker } from 'antd';


class TradeExit extends React.Component {

  render() {
    return(
      <Card title='Trade Exit' style={{ width: 250, height: 235 }}>
        <Row gutter={[0, 30]}>
          <DatePicker placeholder={'Exit Date'} style={{width:300}}/>
        </Row>
        <Row gutter={[0, 20]}>
          <Input placeholder={'Exit Price'} />
        </Row>
        <Row gutter={[0,10]}>
          <Input placeholder={'Proft/Loss'} />
        </Row>
        <Row gutter={[0,0]}>
          <Input placeholder={'Fees'} />
        </Row>
      </Card>
    );
  }

}


export default TradeExit;