const Express = require('express');
const traders = require('./db/tradeModel');
const bodyParser = require('body-parser');
const { response } = require('express');

const app = Express();
const port = 5000;
app.use(bodyParser.json());
const variable = 5;


//GET ALL TRADERS
app.get('/', async (req, res) => {
  var trademans = await traders.getAll();
  console.log(trademans);
  res.json({
    traders: trademans
  });
  res.end();
});

//GET ONE TRADER
app.get('/:username', (req, res) => {
  var username = req.params.username;
  traders.getTrader(username).then(response => {
    res.json({
      trader: response
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

//GET STATISTICS FOR ONE TRADER
app.get('/statistics/:username', (req, res) => {
  var username = req.params.username;
  traders.getTrader(username).then(response => {
    var trades = response[0].trades;
    var wins = []
    var losses = []
    var breakeven = []
    var averageR = 0
    var sumR = 0
    var averageWinner = 0;
    var averageLoser = 0;
    var sumWins = 0;
    var sumLosses = 0;

    for(var i = 0; i < trades.length; i++) {
      if (trades[i].profit > 0) {
        wins.push(trades[i]);
        averageWinner += parseInt(trades[i].profit);
      }
      else if (trades[i].profit < 0) {
        losses.push(trades[i]);
        averageLoser += parseInt(trades[i].profit);
      }
      else breakeven.push(trades[i]);

      console.log(calculateRiskReward(trades[i]));
      averageR += calculateRiskReward(trades[i])
      sumR += calculateRiskReward(trades[i]);

    }

    sumWins = averageWinner;
    sumLosses = averageLoser;

    averageR /= trades.length
    averageWinner /= wins.length
    averageLoser /= losses.length

    var winPercentage = wins.length / (wins.length + losses.length + breakeven.length);
    var lossPercentage = losses.length / (wins.length + losses.length + breakeven.length);
    var expectancy = (averageWinner *  winPercentage) - (averageLoser * lossPercentage);
    var profitFactor = Math.abs(sumWins / sumLosses);


    res.json({
      statistics: {
        numWinners: wins.length,
        numLosers: losses.length,
        averageR: averageR,
        expectancy: expectancy,
        profitFactor: profitFactor,
        sumR: sumR,
        averageWinner: averageWinner,
        averageLoser: averageLoser,
      }
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

function calculateRiskReward(trade) {

  var stop = parseFloat(trade.stopLoss);
  var exitPrice = parseFloat(trade.exitPrice);
  var entry = parseFloat(trade.entryPrice);

  console.log("stop" + stop);
  console.log("exit" + exitPrice);
  console.log("entry" + entry);

  if (entry == stop) {
    return 0;
  }
  return (exitPrice - entry) / (entry - stop);
}

//CREATE TRADER
app.post('/', (req, res) => {

  var aLec = req.body;
  console.log(aLec);
  try {
    var trades = aLec.trades.map(trade => {
      trade.entryDate = new Date(trade.entryDate);
      trade.exitDate = new Date(trade.exitDate);
    });
  } catch(e) {
    res.status(500);
    res.json({
      error: 'Dates must be of format DD/MM/YYYY'
    });
  }

  aLec.trades = trades;

  traders.insertTrader(aLec).then(response => {
    res.status(200);
    res.json({
      added: aLec
    });
    res.end();
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

//UPDATE TRADER BALANCE
app.post('/:username/balance', (req, res) => {
  var update = req.body;
  var username = req.params.username;
  traders.updateBalance(username, update).then(response => {
    res.status(200);
    res.json({
      updatedBalance: update.balance
    });
  }).catch(err => {
    console.log('error logged: ' + err);
    res.json(err);
  });
});

//ADD TRADE TO TRADER
app.post('/:username/trade', (req, res) => {
  var trade = req.body;
  var username = req.params.username;
  try {
    trade.entryDate = new Date(trade.entryDate);
    trade.exitDate = new Date(trade.exitDate);
  } catch(e) {
    res.status(500);
    res.json({
      error: 'Dates must be of format DD/MM/YYYY'
    });
  }

  console.log(trade);

  traders.addTrade(username, trade).then(response => {
    res.status(200);
    res.json({
      added: trade
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

//DELETE TRADER
app.delete('/:username', (req, res) => {
  var username = req.params.username;

  traders.deleteTrader(username).then(response => {
    res.status(200);
    res.json({
      deleted: username
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  })
});

//DELETE TRADE
app.delete('/:username/:tradeID', (req, res) => {
  var username = req.params.username;
  var tradeID = req.params.tradeID;

  traders.deleteTrade(username, tradeID).then(response => {
    res.json({
      deletedTrade: tradeID
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

//WITHDRAW MONEY
app.post('/:username/withdraw', (req, res) => {
  var username = req.params.username;
  var amount = req.body.amount;
  traders.withdraw(username, amount).then(response => {
    res.status(200);
    res.json({
      withdrew: amount
    });
  }).catch(err => {
    res.status(500);
    console.log(err);
  });
})

//DEPOSIT MONEY
app.post('/:username/deposit', (req, res) => {
  var username = req.params.username;
  var amount = req.body.amount;
  traders.deposit(username, amount).then(response => {
    res.status(200);
    res.json({
      deposited: amount
    });
  }).catch(err => {
    res.status(500);
    console.log(err);
  });
});

//WARNING: DELETE EVERYONE
app.delete('/', (req, res) => {
  traders.deleteAll().then(response => {
    res.status(200);
    res.json({
      deleted: 'everyone'
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  })
});

app.listen(port, err => {
  if (err) console.log(err);
  else console.log(`App listening on port ${port}...`)
})