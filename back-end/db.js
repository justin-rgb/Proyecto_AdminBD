const oracledb = require('oracledb');

async function initialize() {
    await oracledb.createPool();
}

async function close() {
    await oracledb.getPool().close();
}

module.exports.initialize = initialize;
module.exports.close = close;