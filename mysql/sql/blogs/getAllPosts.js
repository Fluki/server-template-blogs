const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const getAllPosts = router.get('/posts', (req, res) => {
  const query = 'SELECT * from blogs';

  pool.getConnection((err, connection) => {
    if (err) {
      const data = {
        ok: false,
        message: 'Connection to database failed.',
      };

      res.send(data);
      res.end();
    } else {
      connection.query(query, (err, rows) => {
        connection.release();

        if (!err) {
          const data = {
            ok: true,
            message: 'Postes found.',
            posts: rows,
          };

          res.send(data);
          res.end();
        } else {
          const data = {
            ok: false,
            message: "Couldn't find posts.",
          };

          res.send(data);
          res.end();
        }
      });
    }
  });
});

module.exports = getAllPosts;
