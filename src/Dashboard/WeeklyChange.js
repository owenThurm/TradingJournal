import React from 'react';
import { Card } from 'antd';

export const WeeklyChange = props => {
  return (
    <Card title='Weekly Change' size={'small'}
    style={{textAlign: 'center', width: 200, height: 108, fontSize: 24}} type='inner'>
      {props.change}%
    </Card>
  )
}