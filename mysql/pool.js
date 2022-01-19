const mysql = require('mysql2');
const poolInfo = require('./poolInfo');

const pool = mysql.createPool({
  connectionLimit: poolInfo.connectionLimit,
  host: poolInfo.host,
  port: poolInfo.port,
  user: poolInfo.user,
  password: poolInfo.password,
  database: poolInfo.database,
});

module.exports = pool;
