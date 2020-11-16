import React from 'react';
import './Journal.css';

class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 0
    };
  }

  render() {
    return(
      <div className="AccountBalance">{this.state}</div>
    )
  }



}