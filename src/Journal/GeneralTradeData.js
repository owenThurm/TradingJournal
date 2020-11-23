import React from 'react';
import { Card, Input, DatePicker, Switch, Row, Col } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';


class GeneralTradeData extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return(
      <Card title='General Trade Data' style={{width: 250}}>
        <Row gutter={[0, 30]}>
          <DatePicker style={{width: 250}}/>
        </Row>
        <Row gutter={[0, 20]}>
          <Input placeholder={'Instrument'} />
        </Row>
        <Row gutter={[0, 10]}>
          <Input placeholder={'setup'} />
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
          } defaultChecked />
        </Row>
      </Card>
    )
  }


}

export default GeneralTradeData;