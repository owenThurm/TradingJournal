import React from 'react';
import './Dashboard.css';
import { WeeklyChange } from './WeeklyChange';
import { AccountBalance } from './AccountBalance';
import EquityGraph from './EquityGraph';
import Statistics from './Statistics';
import 'antd/dist/antd.css';
import { Row, Col, Card } from 'antd';
import axios from 'axios';
import Recommendation from './Reccomendation';

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "Alec",
      balance: 0,
    }
  }


  componentDidMount() {
    axios.get("/" + this.state.username).then((response) => {
      console.log(response);
      this.setState({balance: response.data.trader[0].balance});
    });

  }

  render() {
    return (
      <div className="DashboardContainer">
        <div>
          <Row gutter={[16, 16]}>
            <Col flex="5">
              <AccountBalance balance={this.state.balance} />
              <br />
              <WeeklyChange change={3.2} />
              <br />
              <Recommendation recommendation='Place your stop loss higher on buy orders' />
            </Col>
            <Col flex="10"> <EquityGraph /></Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col>
              <Statistics />
            </Col>
          </Row>
        </div>

      </div>


    );
  }
}

export default Dashboard;