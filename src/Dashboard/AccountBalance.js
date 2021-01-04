import React from 'react';
import './Dashboard.css';
import { Card } from 'antd';


export const AccountBalance = props => {
  return(
    <Card title="Balance" bordered={false} size='small' type='inner'
    style={{width: 200, height: 108, textAlign: 'center', fontSize: 24}}>
      ${props.balance}
    </Card>
  );
}
