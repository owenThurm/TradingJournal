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
  //res.send("HELLO");
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
    res.json({
      statistics: {
        numWinners: 7,
        numLosers: 7,
        maxDrawdown: 0.20,
        averageR: 2,
        expectancy: 8.8,
        profitFactor: 2.2,
        sumR: 20.0,
        averageWinner: 1.21,
        averageLoser: -2,
      }
    });
  }).catch(err => {
    console.log(err);
    res.json(err);
  });
});

//CREATE TRADER
app.post('/', (req, res) => {

  var aLec = req.body;
  console.log(aLec);

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