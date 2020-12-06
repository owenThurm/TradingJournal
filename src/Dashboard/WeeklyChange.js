import React from 'react';
import { Card } from 'antd';

export const WeeklyChange = props => {
  return (
    <Card title='Weekly Change' size={'small'}
    style={{textAlign: 'center', width: 130}} type='inner'>
      {props.change}%
    </Card>
  )
}