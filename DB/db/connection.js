const monk = require('monk');

const connectionString = 'localhost/tradingJournalDB';
const db = monk(connectionString);


module.exports = db;