import AccountBalance from './AccountBalance';
import React from 'react';
import './Journal.css';

class Journal extends React.Component {
  render() {
    return(
      <div className="JournalContainer">
        <AccountBalance/>
      </div>
    );
  }
}

export default Journal;