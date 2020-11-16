import React from 'react';
import './Journal.css';

class AccountBalance extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      balance: props.balance
    };
  }

  render() {
    return(
    <div className="AccountBalance">{'Balance'} <br/> {'$' + this.state.balance}</div>
    )
  }
}

export default AccountBalance;