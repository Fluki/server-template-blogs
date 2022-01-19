const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const getAllPosts = router.get('', (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query('SELECT * from blogs', (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = getAllPosts;
