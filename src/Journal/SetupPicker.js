import React from 'react';
import { Select, Divider, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';
const { Option } = Select;


let index = 0;

class SetupPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: props.setups,
      name: '',
      username: 'Alec'
    }
  }

  onNameChange = event => {
    this.setState({
      name: event.target.value,
    });
  };

  addItem = () => {
    //AXIOS POST
    console.log('addItem');
    const { items, name } = this.state;

    axios({
      method: 'POST',
      url: '/' + this.state.username + '/setup',
      data: {
        setup: name
      }
     }).then(response => {
       console.log(response);
       this.setState({
        items: [...items, name || `New item ${index++}`],
        name: '',
      });
     }).catch(err => {
      console.log('ERROR', err);
    });
  };

  render() {
    const { items, name } = this.state;
    return (
      <Select
        onChange={this.props.onChange}
        style={{ width: 200 }}
        placeholder="Setup"
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input style={{ flex: 'auto' }} value={name} onChange={this.onNameChange} />
              <a
                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                onClick={this.addItem}
              >
                <PlusOutlined /> Add item
              </a>
            </div>
          </div>
        )}
      >
        {items.map(item => (
          <Option key={item}>{item}</Option>
        ))}
      </Select>
    );
  }
}

export default SetupPicker;