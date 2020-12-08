import React from 'react';
import { Card, Button, Input } from 'antd';


export const Withdraw = props => {
  return (
    <Card style={{width: 1139, height: 550}}>
      Withdraw
      <Input placeholder='Withdraw Balance' />
      <Button>Withdraw</Button>
    </Card>
  );
}