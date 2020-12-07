import React from 'react';
import { Button, Input } from 'antd';

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return(
      <div>
        <Input placeholder="deposit number"></Input>
        <Button type="primary">Deposit</Button>
        <Input placeholder="withdraw number"></Input>
        <Button type="primary">Withdraw</Button>

      </div>
    );
  }



}


export default Settings;