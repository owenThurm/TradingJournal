import React from 'react';
import { Menu, Row } from 'antd';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Deposit } from './Deposit';
import { Switch, Link } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { General } from './General';

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
        <Row>
          <Menu
          onClick={this.handleClick}
          style={{ width: 256, backgroundColor: 'white' }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          >
            <Menu.Item>
              <Link to='/settings'>General Settings</Link>
            </Menu.Item>
            <SubMenu title='Account Balance'>
              <Menu.Item>
                <Link to='/settings/deposit'>
                  Deposit Balance
                </Link>
              </Menu.Item>
              <Menu.Item>Withdraw Balance</Menu.Item>
            </SubMenu>
            <SubMenu title='Login Information'>
              <Menu.Item>Reset Password</Menu.Item>
            </SubMenu>
          </Menu>
          <Switch>
            <ProtectedRoute exact path="/settings" component={General} />
            <ProtectedRoute exact path='/settings/deposit' component={Deposit} />
          </Switch>
        </Row>
      </div>
    );
  }
}
export default Settings;