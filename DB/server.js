const Express = require('express');
const traders = require('./db/tradeModel');
const bodyParser = require('body-parser');

const app = Express();
const port = 5000;
const variable = 5;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//GET ALL TRADERS
app.get('/', async (req, res) => {
  var trademans = await traders.getAll();
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
  //console.log(username);
  traders.getTrader(username).then(response => {
    var trades = response[0].trades;
    var wins = []
    var losses = []
    var breakeven = []
    var averageR = 0
    var sumR = 0
    var averageWinner = 0;
    var averageLoser = 0;
    var sumWins = 0; // total $ of win profits
    var sumLosses = 0; // total $ of losses

    if (trades.length == 0) {
      return;
    }

    for(var i = 0; i < trades.length; i++) {
      if (trades[i].profit > 0) {
        wins.push(trades[i]);
        sumWins += parseInt(trades[i].profit);
        console.log("IN WINNER");
        console.log(averageWinner);
      }
      else if (trades[i].profit < 0) {
        losses.push(trades[i]);
        sumLosses += parseInt(trades[i].profit);
      }
      else breakeven.push(trades[i]);

      averageR += calculateRiskReward(trades[i]);
      sumR += calculateRiskReward(trades[i]);

    }

    averageR /= trades.length;

    
    if (wins.length > 0) averageWinner = sumWins / wins.length;
    if (losses.length > 0) averageLoser = sumLosses / losses.length;

    var winPercentage = wins.length / (wins.length + losses.length + breakeven.length);
    var lossPercentage = losses.length / (wins.length + losses.length + breakeven.length);
    var expectancy = (averageWinner *  winPercentage) - (averageLoser * lossPercentage);
    var profitFactor = 99999999;
    
    if (sumLosses != 0) profitFactor = Math.abs(sumWins / sumLosses);
    
    console.log("Win Perce: " + winPercentage);
    console.log("Loss Perc.: " + lossPercentage);
    console.log("Avg loser.: " + averageLoser);
    console.log("Expec: " + expectancy);

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
  console.log(stop);
  console.log(exitPrice);
  console.log(entry);

  if (Math.abs(entry-stop) < 0.0001) {
    return 0;
  }
  return (exitPrice - entry) / (entry - stop);
}

//CREATE TRADER
app.post('/', (req, res) => {

  var aLec = req.body;
  try {
    var trades = aLec.trades.map(trade => {
      trade.entryDate = new Date(trade.entryDate);
      trade.exitDate = new Date(trade.exitDate);
      return trade;
    });
  } catch(e) {
    res.status(500);
    res.json({
      error: e
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

//UPDATE TRADE
app.post('/:username/:tradeID/updatetrade', (req, res) => {
  var username = req.params.username;

  var tradeID = req.params.tradeID;
  var newTrade = req.body;
  console.log(req.body)
  console.log('newTrade', newTrade);

  try {
    console.log(newTrade.entryDate);
    console.log(new Date(newTrade.entryDate));
    newTrade.entryDate = new Date(newTrade.entryDate);
    newTrade.exitDate = new Date(newTrade.exitDate);
  } catch(e) {
    res.status(505);
    res.json({
      error: e
    });
  }

  console.log(newTrade);
  console.log("GOT TO HERE")
  traders.updateTrade(username, tradeID, newTrade).then(response => {
    console.log("HERERERERERE")
    res.status(200);
    res.json({
      updated: tradeID,
      now: newTrade
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json({
      error: err
    });
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
});

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

//POST TRADER SETUPS
app.post('/:username/setup', (req, res) => {
  var username = req.params.username;
  var setup = req.body.setup;

  traders.addSetup(username, setup).then(response => {
    res.status(200);
    res.json({
      added: setup
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json({
      error: err
    });
  });
});

//GET TRADER SETUPS
app.get('/:username/setups', (req, res) => {
  var username = req.params.username;

  traders.getSetups(username).then(response => {
    console.log(response);
    res.status(200);
    res.json({
      setups: response
    });
  }).catch(err => {
    console.log(err);
    res.status(500);
    res.json({
      error: err
    });
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