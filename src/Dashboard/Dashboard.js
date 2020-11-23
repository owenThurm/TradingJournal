import React from 'react';
import './Dashboard.css';
import WeeklyChange from './WeeklyChange';
import AccountBalance from './AccountBalance';
import EquityGraph from './EquityGraph';
import Statistics from './Statistics';
import Winrate from './Winrate';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';

class Dashboard extends React.Component {
  render() {
    return (
      <div className="DashboardContainer">
        <div>
          <Row gutter={[16, 16]}>
            <Col flex="4"> <AccountBalance balance={1000} /></Col>
            <Col flex="auto"> <EquityGraph /></Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col flex="auto"><WeeklyChange change={3.2} /></Col>
          </Row>
        </div>
        <Statistics />

      </div>


    );
  }
}

export default Dashboard;