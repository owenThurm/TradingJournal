import React from 'react';
import { Modal, Button } from 'antd';

class Journal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }


  showModal = () => {
    this.setState({
      visible: true
    });
  }

  handleSubmitTrade = () => {
    this.setState({
      visible: false
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false
    });
  }

  render() {
    return(
      <div>
        <p>Journal</p>

        <Button onClick={this.showModal.bind(this)}>
          Add Trade
        </Button>

        <Modal title="Create Trade Entry"
        visible={this.state.visible}
        onOk={this.handleSubmitTrade.bind(this)}
        onCancel={this.handleCancel.bind(this)}
        width={1000}>
          <p> Hello Modal </p>
        </Modal>
      </div>
    )
  }
}
export default Journal;