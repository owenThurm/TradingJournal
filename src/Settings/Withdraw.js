import React from 'react';
import { Card, Button, Input, Form } from 'antd';
import { isNumber } from '../utils';


export const Withdraw = props => {

  const onFinish = values => {
    console.log('success', values);
  }

  return (
    <Card style={{width: 1139, height: 550}}>
      Withdraw
      <Form onFinish={onFinish}>
        <Form.Item name='Deposit' rules={[{
          required: true,
          message: 'Enter a Withdraw Value',
          validator: isNumber
        }]}>
          <Input placeholder='Withdraw Value'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Withdraw</Button>
        </Form.Item>
      </Form>
    </Card>
  );
}