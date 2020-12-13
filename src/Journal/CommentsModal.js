import React from 'react';

import { Modal, Card, Button, Upload }  from 'antd';

class CommandModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: props.visible,
      trade: props.trade
    }
  }

  onSubmit = () => {
    //AXIOS POST TRADE

    this.props.onCancel();
  }

  render() {
    return(
      <Modal width={1000} visible={this.state.visible}
            onOk={this.onSubmit}
            onCancel={this.props.onCancel}>
              {/* Render image from record.screenshot  */}
              <Card title='Screen Shot'>
                <img src={this.state.trade.screenshot} style={{width: 900}}/>
              </Card>
              <Card title='Comments'>
                {this.state.trade.comments}
              </Card>
              <Button style={{marginLeft: 20, marginTop: 10}}>Edit Comment</Button>
              <Upload>
                <Button style={{marginLeft: 20}}> Re-Upload Trade </Button>
              </Upload>

            </Modal>
    );
  }
}

export default CommandModal;