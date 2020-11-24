import React from 'react';


class JournalEntry extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            tradeNumber: 0,
            strategy: null,
            buyOrSell: null,
            quantity: null,
            entryPrice: null,
            risk: null,
            takeProfitPrice: null,
            stopLossPrice: null,
            exitPrice: null,
            fees: null,
            originalTakeProfitHit: null,
            gainOrLoss: null
        };
    }


    render() {
        return <p>Test</p>
    }




}