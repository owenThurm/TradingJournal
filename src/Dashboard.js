import AccountBalance from './AccountBalance';
import React from 'react';
import './Dashboard.css';
import WeeklyChange from './WeeklyChange';
import EquityGraph from './EquityGraph';
import Statistics from './Statistics';

class Dashboard extends React.Component {
  render() {
    return(
      <div className="DashboardContainer">
        <AccountBalance balance={1000}/>
        <WeeklyChange change={3.2}/>
        <EquityGraph/>
        <Statistics />
      </div>
    );
  }
}

export default Dashboard;