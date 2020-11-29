const Express = require('express');
const traders = require('./db/tradeModel');
const bodyParser = require('body-parser');

const app = Express();
const port = 5000;

app.use(bodyParser.json());


//GET ALL TRADERS
app.get('/getAll', async (req, res) => {
  var trademans = await traders.getAll();
  res.json({
    tradeMansesis: trademans
  });
  res.end();
});

//GET ONE TRADER
app.get('/:username', (req, res) => {
  var username = req.params.username;
  traders.getTrader(username).then(response => {
    res.json({
      tradesman: response
    });
  }).catch(err => {
    console.log(err);
  });
});

//CREATE TRADER
app.post('/create', (req, res) => {

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
  });
});

//UPDATE TRADER BALANCE
app.put('/:username/balance', (req, res) => {
  var update = req.body;
  var username = req.params.username;
  traders.updateBalance(username, update).then(response => {
    res.status(200);
    res.json({
      updatedBalance: update.balance
    });
  }).catch(err => {
    console.log('error logged: ' + err);
  });
});

//UPDATE TRADER TRADES
app.put('/:username/trade', (req, res) => {
  var trade = req.body;
  var username = req.params.username;

  traders.addTrade(username, trade).then(response => {
    res.status(200);
    res.json({
      added: trade
    });
  }).catch(err => {
    console.log(err);
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
  })
});

//WARNING: DELETE EVERYONE
app.delete('/deleteAll', (req, res) => {
  traders.deleteAll().then(response => {
    res.status(200);
    res.json({
      deleted: 'everyone'
    });
  }).catch(err => {
    console.log(err);
  })
});

app.listen(port, err => {
  if(err) console.log(err);
  else console.log(`App listening on port ${port}...`)
})