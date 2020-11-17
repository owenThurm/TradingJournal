import AccountBalance from './AccountBalance';
import React from 'react';
import './Journal.css';
import WeeklyChange from './WeeklyChange';
import EquityGraph from './EquityGraph';

class Journal extends React.Component {
  render() {
    return(
      <div className="JournalContainer">
        <AccountBalance balance={1000}/>
        <WeeklyChange change={3.2}/>
        <EquityGraph/>
      </div>
    );
  }
}

export default Journal;