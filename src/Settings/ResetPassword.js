import React from 'react';
import { Card, Input, Button } from 'antd';

export const ResetPassword = props => {
  return (
    <Card style={{width: 1139, height: 550}}>
      Reset Password
      <Input placeholder='New Password' />
      <Button>Set Password</Button>
    </Card>
  )
}