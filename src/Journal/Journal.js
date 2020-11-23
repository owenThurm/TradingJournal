import React from 'react';
import { Modal, Button, Input } from 'antd';
import AddTrade from './AddTrade';

class Journal extends React.Component {

  render() {
    return(
      <div>
        <p>Journal</p>
        <AddTrade />
      </div>
    )
  }
}
export default Journal;