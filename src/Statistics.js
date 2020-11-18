import React from 'react';
import Winrate from './Winrate';
import { Row, Col } from 'antd';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: {
                numWinners: 7,
                numLosers: 3,
                maxDrawdown: 0.20,
                averageR: 2,
                expectancy: 8.8,
                profitFactor: 2.2,
                sumR: 20.0,
                averageWinner: 1.21,
                averageLoser: -0.90,

            }
        };
    }

    /*componentDidMount() {
        this.setState({
            statistics: {
                numWinners: 12,
                numLosers: 4,
            }
        });
    }*/

    render() {
        return (
            <div>
                <h1>Statistics Test</h1>
                <Row gutter={[24, 16]}>
                    <Col span={3}>
                        {this.state.statistics.numWinners}
                        <br />
                        {this.state.statistics.numLosers}
                    </Col>
                    <Col span={8}><Winrate /></Col>
                </Row>
                <Row gutter={[24, 16]}>
                    <Col span={8}>{this.state.statistics.averageWinner}</Col>
                    <Col span={8}>{this.state.statistics.averageLoser}</Col>
                    <Col span={8}>{this.state.statistics.sumR}</Col>
                </Row>
                <Row gutter={[24, 16]}>
                    <Col span={8}>{this.state.statistics.averageR}</Col>
                    <Col span={8}>{this.state.statistics.expectancy}</Col>
                    <Col span={8}>{this.state.statistics.profitFactor}</Col>
                </Row>
            </div>

        );
    }
}

export default Statistics;