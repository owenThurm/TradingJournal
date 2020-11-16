import React from 'react';
import './Journal.css';

class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: 1000
    };
  }

  render() {
    return(
    <div className="AccountBalance">{'Balance: $' + this.state.balance}</div>
    )
  }
}

export default AccountBalance;