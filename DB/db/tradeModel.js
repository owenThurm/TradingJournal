const Joi = require('@hapi/joi');
const db = require('./connection');

const tradeSchema = Joi.object().keys({
  tradeID: Joi.number(),
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
  buyOrSell: Joi.boolean().required(),
  comments: Joi.string().allow(null).allow('')
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
      trade.tradeID = response[0].trades ? response[0].trades.length+1 : 1;
      return response[0].trades ? insertion(trade, response[0].trades) : [trade];
    }).catch(err => {
      console.log(err);
    });
    return traders.findOneAndUpdate({username: name},
      { $set: { trades: newTradeList } });
  }
}

function insertion(trade, tradeList) {

  //insert new trade into new trade list at the first position where a date
  //is <= this trade date.

  console.log(tradeList);
  console.log(mapDate(trade.exitDate));

  for(var i=tradeList.length-1; i>=0; i--) {
    if(mapDate(tradeList[i].exitDate) <= mapDate(trade.exitDate)) {
      //Insert
      tradeList.splice(i+1, 0, trade);
      break;
    }
    else {
      tradeList.splice(0, 0, trade);
    }
  }
  return tradeList;
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
  return traders.findOneAndUpdate({username: name},
    {$set: {trades: newTradeList } });
}

//Maps dates to integers
function mapDate(date) {
  var dateList = date.slice(0,10).split('-');
  return dateList[0] * 365 + dateList[1] * 30 + dateList[2];
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