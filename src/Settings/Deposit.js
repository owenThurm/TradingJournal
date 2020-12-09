import React from 'react';
import { Card, Input, Button, Form } from 'antd';
import axios from 'axios';
import { isNumber } from '../utils';

export const Deposit = props => {
  const [form] = Form.useForm();
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
      form.resetFields();
    }).catch(err => {
      console.log(err);
    });
  }

  return (
    <Card style={{width: 1139, height: 550}}>
      Deposit
      <Form onFinish={onFinish} form={form}>
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