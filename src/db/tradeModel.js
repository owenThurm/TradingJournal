const Joi = require('@hapi/joi');
const db = require('./connection');

const tradeSchema = Joi.object().keys({
  tradeID: Joi.number().required(),
  entryDate: Joi.date().required(),
  instrument: Joi.string().required(),
  setup: Joi.string().required(),
  entryPrice: Joi.number().required(),
  quantity: Joi.number().required(),
  stopLoss: Joi.number().required(),
  takeProfit: Joi.number().required(),
  exitDate: Joi.date().required(),
  exitPrice: Joi.number().required(),
  profit: Joi.number().required(),
  fees: Joi.number().required(),
  buyOrSell: Joi.string().required(),
  comments: Joi.string()
});


const traderSchema = Joi.object().keys({
  username: Joi.string().alphanum().min(3).max(12).required(),
  password: Joi.string().min(6).required(),
  balance: Joi.number().required(),
  trades: Joi.array().items(tradeSchema).required()
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
  if(result.error) return Promise.reject(result.error);
  else {
    var newTradeList = await getTrader(name).then(response => {
      return response[0].trades ? response[0].trades.concat([trade]) : [trade];
    }).catch(err => {
      console.log(err);
    });

    return traders.findOneAndUpdate({username: name},
      { $set: { trades: newTradeList } });
  }
}

async function deleteTrade(name, tradeID) {
  var newTradeList = await getTrader(name).then(response => {
    var newList = [];
    response[0].trades.map(trade => {
      if(trade.tradeID != tradeID) newList.push(trade);
    });
    return newList;
  }).catch(err => {
    console.log(err);
  })
  return trader.findOneAndUpdate({username: name},
    {$set: {trades: newTradeList } });
}

function deleteTrader(name) {
  return traders.findOneAndDelete({ username: name });
}

function insertTrader(trader) {
  var result = traderSchema.validate(trader);
  if(result.error) return Promise.reject(result.error);
  else return traders.insert(trader);
}

module.exports = {insertTrader, getAll, deleteTrader, getTrader,
   deleteAll, updateBalance, addTrade, deleteTrade};