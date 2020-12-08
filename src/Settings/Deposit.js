import React from 'react';
import { Card, Input, Button } from 'antd';


export const Deposit = props => {
  return (
    <Card style={{width: 1139, height: 550}}>
      Deposit
      <Input placeholder='Deposit Balance'/>
      <Button>Deposit</Button>
    </Card>
  )
}