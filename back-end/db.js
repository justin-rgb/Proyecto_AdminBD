const oracledb = require('oracledb');
const dbConfig = require('./dbConfig');

async function initialize() {
    await oracledb.createPool(dbConfig);
}

async function close() {
    await oracledb.getPool().close();
}

module.exports.initialize = initialize;
module.exports.close = close;