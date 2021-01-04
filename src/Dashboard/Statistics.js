import React from 'react';
import Winrate from './Winrate';
import { Row, Col, Progress, Card } from 'antd';
import axios from 'axios';

class Statistics extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            statistics: {
                numWinners: 7,
                numLosers: 5,
                averageR: 2,
                expectancy: 8.8,
                profitFactor: 2.2,
                sumR: 20.0,
                averageWinner: 1.21,
                averageLoser: -0.90,
            },
            username : "Alec"
        };
    }

    componentDidMount() {

        // axios request to get statistics
        axios.get("/statistics/" + this.state.username).then(response => {
            console.log(response);
            this.setState({
                statistics: response.data.statistics
            })
        })
        .catch(err => {
            console.log(err);
        });

    }



    render() {

        var winrate = Math.round(this.state.statistics.numWinners / (this.state.statistics.numLosers +
            this.state.statistics.numWinners) * 100);



        return (
            <Card title='Overall Statistics' style={{width: 1152, height: 230}} type='inner'>
                    <Row gutter={[24, 16]}>
                        <Col span={4}>
                            <Card size='small' style={{width: 120}} bordered={false}
                            headStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center', color: 'green', fontSize: 18}}
                            >Winners: {this.state.statistics.numWinners}</Card>
                            <Card size='small' style={{width: 120}} bordered={false}
                            headStyle={{textAlign: 'center'}} bodyStyle={{textAlign: 'center', color: 'red', fontSize: 18}}
                            >Losers: {this.state.statistics.numLosers}</Card>
                        </Col>
                        <Col span={6}><Winrate winRate={winrate} loseRate={0}/></Col>
                        <Col>
                            <Row gutter={[24, 16]}>
                                <Col span={8}>Average Winner: <br />{this.state.statistics.averageWinner}</Col>
                                <Col span={8}>Average Loser: <br />{this.state.statistics.averageLoser}</Col>
                                <Col span={8}>Sum R multiple: <br />{this.state.statistics.sumR.toFixed(2)}</Col>
                            </Row>
                            <Row gutter={[24, 16]}>
                                <Col span={8}>Average R multiple: <br />{this.state.statistics.averageR.toFixed(2)}</Col>
                                <Col span={8}>Expectancy: <br />{this.state.statistics.expectancy.toFixed(2)}</Col>
                                <Col span={8}>Profit Factor: <br />{this.state.statistics.profitFactor.toFixed(2)}</Col>
                            </Row>
                        </Col>
                    </Row>
            </Card>
        );
    }
}

export default Statistics;