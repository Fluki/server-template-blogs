const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const getSpecificPost = router.get(`/blogs/:id`, (req, res) => {
  const id = req.params.id;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(`SELECT * from blogs WHERE id=${id}`, (err, rows) => {
      connection.release();

      if (!err) {
        res.send(rows);
      } else {
        console.log(err);
      }
    });
  });
});

module.exports = getSpecificPost;
