import React from 'react';
import { Menu, Row, Col } from 'antd';
import { Deposit } from './Deposit';
import { Switch, Link } from 'react-router-dom';
import ProtectedRoute from '../ProtectedRoute';
import { General } from './General';
import { ResetPassword } from './ResetPassword';
import { Withdraw } from './Withdraw';

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
        <Row gutter={[5, 0]}>
          <Col>
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
                <Menu.Item>
                  <Link to='/settings/withdraw'>
                    Withdraw Balance
                  </Link>
                </Menu.Item>
              </SubMenu>
              <SubMenu title='Login Information'>
                <Menu.Item>
                  <Link to='/settings/resetpassword'>
                    Reset Password
                  </Link>
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
          <Col>
            <Switch>
              <ProtectedRoute path='/settings/deposit' component={Deposit} componentProps={{username: 'Alec'}}/>
              <ProtectedRoute path='/settings/withdraw' component={Withdraw} componentProps={{username: 'Alec'}}/>
              <ProtectedRoute path='/settings/resetpassword' component={ResetPassword} />
              <ProtectedRoute path="/settings" component={General} />
            </Switch>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Settings;