import React from 'react';
import { Card, Row, Input, DatePicker } from 'antd';


class TradeExit extends React.Component {

  render() {
    return(
      <Card title='Trade Exit' style={{ width: 250, height: 235}}>
        <Row gutter={[0, 30]}>
          <DatePicker placeholder={'Exit Date'} style={{width:300}}
          onChange={ event => { this.props.handleChange(event, 'exitDate') }
        }/>
        </Row>
        <Row gutter={[0, 20]}>
          <Input placeholder={'Exit Price'}
          onChange={ event => { this.props.handleChange(event, 'exitPrice') }
          }/>
        </Row>
        <Row gutter={[0,10]}>
          <Input placeholder={'Proft/Loss'}
          onChange={ event => { this.props.handleChange(event, 'profit') }
          }/>
        </Row>
        <Row gutter={[0,0]}>
          <Input placeholder={'Fees'}
          onChange={ event => { this.props.handleChange(event, 'fees') }
          }/>
        </Row>
      </Card>
    );
  }

}


export default TradeExit;