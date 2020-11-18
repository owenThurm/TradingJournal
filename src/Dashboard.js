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
          <AccountBalance balance={1000} />
          <WeeklyChange change={3.2} />
          <EquityGraph />
        </div>
        <Statistics />

      </div>


    );
  }
}

export default Dashboard;