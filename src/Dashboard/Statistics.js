import React from 'react';
import Winrate from './Winrate';
import { Row, Col, Progress } from 'antd';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: {
                numWinners: 7,
                numLosers: 5,
                maxDrawdown: 0.20,
                averageR: 2,
                expectancy: 8.8,
                profitFactor: 2.2,
                sumR: 20.0,
                averageWinner: 1.21,
                averageLoser: -0.90,

            },
        };
    }

    componentDidMount() {

        // axios request to get statistics

    }



    render() {

        var winrate = Math.round(this.state.statistics.numWinners / (this.state.statistics.numLosers +
            this.state.statistics.numWinners) * 100);



        return (
            <div>
                <h1>Statistics Test</h1>
                <Row gutter={[24, 16]}>
                    <Col span={3}>
                        <h3 className="winner">Winners: {this.state.statistics.numWinners}</h3>
                        <h3 className="loser">Losers: {this.state.statistics.numLosers}</h3>
                    </Col>
                    <Col span={8}><Winrate winRate={winrate} loseRate={20}/></Col>
                </Row>
                <Row gutter={[24, 16]}>
                    <Col span={8}>Average Winner: {this.state.statistics.averageWinner}</Col>
                    <Col span={8}>Average Loser: {this.state.statistics.averageLoser}</Col>
                    <Col span={8}>Sum R multiple: {this.state.statistics.sumR}</Col>
                </Row>
                <Row gutter={[24, 16]}>
                    <Col span={8}>Average R multiple: {this.state.statistics.averageR}</Col>
                    <Col span={8}>Expectancy: {this.state.statistics.expectancy}</Col>
                    <Col span={8}>Profit Factor: {this.state.statistics.profitFactor}</Col>
                </Row>
            </div>

        );
    }
}

export default Statistics;