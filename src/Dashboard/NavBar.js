import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';

function NavBar() {

    return (
        <Menu mode="horizontal">
            <Menu.Item icon={<HomeOutlined />}>
                <Link to="/">Home</Link>
            </Menu.Item>

            <Menu.Item icon={<BookOutlined />}>
                <Link to="/journal">Journal</Link>
            </Menu.Item>

            <Menu.Item icon={<SettingOutlined />}>
                <Link to="/settings">Settings</Link>
            </Menu.Item>
        </Menu>
    );

}

export default NavBar;