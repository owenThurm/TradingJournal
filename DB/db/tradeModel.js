const Joi = require('@hapi/joi').extend(require('@hapi/joi-date'));
const db = require('./connection');

const tradeSchema = Joi.object().keys({
  tradeID: Joi.number().strict(),
  entryDate: Joi.date().strict().required(),
  instrument: Joi.string().required(),
  setup: Joi.string().required(),
  entryPrice: Joi.number().strict().required(),
  quantity: Joi.number().strict().required(),
  stopLoss: Joi.number().strict().required(),
  takeProfit: Joi.number().strict().required(),
  exitDate: Joi.date().strict().required(),
  exitPrice: Joi.number().strict().required(),
  profit: Joi.number().strict().required(),
  fees: Joi.number().strict().required(),
  buyOrSell: Joi.boolean().strict().required(),
  comments: Joi.string().allow(null).allow(''),
  screenshot: Joi.string().allow(null).allow(''),
  isTransaction: Joi.boolean().strict().required()
});

const traderSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(12).required(),
  password: Joi.string().min(6).required(),
  balance: Joi.number().strict().required(),
  setups: Joi.array().items(Joi.string()).allow(null).required(),
  trades: Joi.array().items(tradeSchema).strict().required()
});

const traders = db.get('traders');

traders.createIndex('username', { unique: true });

function getAll() {
  return traders.find();
}

function getTrader(name) {
  return traders.find({username: name});
}

function deleteAll() {
  return traders.remove();
}

function updateBalance(name, update) {
  var result = Joi.attempt(update.balance, Joi.number());
  if(result.error) return Promise.reject(result.error);
  else return traders.findOneAndUpdate({username: name},
    { $set: { balance: update.balance } });
}

async function addTrade(name, trade) {
  var result = tradeSchema.validate(trade);
  var profit = trade.profit;
  console.log("profit: " + profit);
  var currBalance = -1;
  if(result.error) return Promise.reject(result.error);
  else {
    var newTradeList = await getTrader(name).then(response => {
      trade.tradeID = response[0].trades ? response[0].trades.length+1 : 1;
      currBalance = response[0].balance;
      console.log("currBalance: " + currBalance);
      return response[0].trades ? tradeInsertion(trade, response[0].trades) : [trade];
    }).catch(err => {
      console.log(err);
    });
    return traders.findOneAndUpdate({username: name},
      {
        $set: { trades: newTradeList, balance: currBalance + profit },
      });
  }
}

async function addSetup(name, setup) {
  var trader = await getTrader(name);
  var setups = trader[0].setups;
  setups.push(setup);

  return traders.findOneAndUpdate({username: name},
     { $set: { setups: setups } });
}

async function getSetups(name) {
  var trader = await getTrader(name);
  console.log(trader);
  return trader[0].setups;
}

//Insert a trade into a list of trades according to date.
function tradeInsertion(trade, tradeList) {

  //insert new trade into new trade list at the first position where a date
  //is <= this trade date.

  for(var i=tradeList.length-1; i>=0; i--) {
    if(tradeList[i].exitDate.getTime() <= trade.exitDate.getTime()) {
      //Insert
      tradeList.splice(i+1, 0, trade);
      return tradeList;
    }
  }
  tradeList.splice(0, 0, trade);
  return tradeList;
}

async function deleteTrade(name, tradeID) {
  var newTradeList = await getTrader(name).then(response => {
    var newList = [];
    response[0].trades.map(trade => {
      if(trade.tradeID != tradeID) newList.push(trade);
    });
    for(var i=0; i<newList.length; i++) {
      var trade = newList[i];
      if(trade.tradeID > tradeID) trade.tradeID--;
    };
    return newList;
  }).catch(err => {
    console.log(err);
  })
  return traders.findOneAndUpdate({username: name},
    {$set: {trades: newTradeList } });
}

//DELETE TRADER
function deleteTrader(name) {
  return traders.findOneAndDelete({ username: name });
}

//ADD TRADER
function insertTrader(trader) {
  var result = traderSchema.validate(trader);
  if(result.error) return Promise.reject(result.error);
  else {
    var sortedTrades = [];
    //Loop through trader trades
    //give each trade an appropriate trade id
    //insert each trade in the right date position in a list
    for(var i=0; i<trader.trades.length; i++) {
      trader.trades[i].tradeID = i+1;
      sortedTrades = tradeInsertion(trader.trades[i], sortedTrades);
    }

    //assign the trader.trades to the new list
    trader.trades = sortedTrades;

    //push the trader into the db
    return traders.insert(trader);
  }
}

//WITHDRAW BALANCE
function withdraw(trader, amount) {
  var withdrawal = {
    entryDate: new Date(),
    instrument: 'bank',
    setup: 'withdrawal',
    entryPrice: 0,
    quantity: 0,
    stopLoss: 0,
    takeProfit: 0,
    exitDate: new Date(),
    exitPrice: 0,
    profit: -amount,
    fees: 0,
    buyOrSell: false,
    comments: '',
    isTransaction: true
  }
  return this.addTrade(trader, withdrawal);
}

//UPDATE TRADE
async function updateTrade(trader, tradeID, newTrade) {
  await this.deleteTrade(trader, tradeID);
  return this.addTrade(trader, newTrade);
}

//DEPOSIT BALANCE
function deposit(trader, amount) {
  var deposit = {
    entryDate: new Date(),
    instrument: 'bank',
    setup: 'deposit',
    entryPrice: 0,
    quantity: 0,
    stopLoss: 0,
    takeProfit: 0,
    exitDate: new Date(),
    exitPrice: 0,
    profit: amount,
    fees: 0,
    buyOrSell: false,
    comments: '',
    isTransaction: true
  }
  return this.addTrade(trader, deposit);
}

module.exports = {insertTrader, getAll, deleteTrader, getTrader,
   deleteAll, updateBalance, addTrade, deleteTrade, withdraw, deposit, updateTrade, getSetups, addSetup};