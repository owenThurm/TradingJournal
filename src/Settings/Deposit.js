import React from 'react';
import { Card, Input, Button, Form } from 'antd';
import axios from 'axios';

export const Deposit = props => {
  console.log(props);
  const onFinish = values => {
    console.log('Success', values);
    console.log(parseInt(values.Deposit));
    axios({
      method: 'POST',
      url: '/' + props.data.username + '/deposit',
      data: {
        amount: parseInt(values.Deposit)
      }
    }).then(response => {
      console.log(response);
      console.log('hi');
    }).catch(err => {
      console.log(err);
    });
  }

  const isNumber = (rule, value) => {
    if(isNaN(value)) return Promise.reject();
    else return Promise.resolve();
  }

  return (
    <Card style={{width: 1139, height: 550}}>
      Deposit
      <Form onFinish={onFinish}>
        <Form.Item name='Deposit' rules={[{
          required: true,
          message: 'Enter a Deposit Value',
          validator: isNumber
        }]}>
          <Input placeholder='Deposit Value'/>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>Deposit</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}