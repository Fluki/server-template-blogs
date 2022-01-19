const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const deletePost = router.get(`/delete/:id`, (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM blogs WHERE id=${id}`;

  res.send('Success');

  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(deleteQuery, (err, rows) => {
      connection.release();
    });
  });

  console.log(id);
});

module.exports = deletePost;
