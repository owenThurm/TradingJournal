import { Form, Input, Button, Modal } from 'antd';
import React from 'react';

class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
     };
  }

  formRef = React.createRef();

  function1 = () => {
    console.log(this.formRef);
  }

  render() {
    return (
      <div>
        <Modal visible={this.state.visible} onOk={this.function1.bind(this)}>
          <Form ref={this.formRef}>
            <Form.Item name="usernamesss" rules={[{
                        required: true,
                        message: 'Input a description for Instrument!'
                        }]}>
              <Input />
            </Form.Item>
            <Input />
          </Form>
        </Modal>

        <button onClick={event => this.setState({visible: true})}>
          click
        </button>

      </div>
    );
  }
}

export default Demo;
