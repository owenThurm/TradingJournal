import React from 'react';
import { Menu, Row } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  clicked = event => console.log('clicked');

  render() {
    return(
      <div style={{ margin: 20 }}>
        <Menu
        onClick={this.handleClick}
        style={{ width: 256, backgroundColor: 'white' }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        >
          <SubMenu title='Account Balance'>
            <Menu.Item onClick={this.clicked}>Deposit Balance</Menu.Item>
            <Menu.Item>Withdraw Balance</Menu.Item>
          </SubMenu>
          <SubMenu title='Login Information'>
            <Menu.Item>Reset Password</Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    );
  }
}
export default Settings;