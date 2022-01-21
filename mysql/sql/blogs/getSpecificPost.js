const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const getSpecificPost = router.get(`/post/:id`, (req, res) => {
  const id = req.params.id;
  const query = `SELECT * from blogs WHERE id=${id}`;

  pool.getConnection((err, connection) => {
    connection.query(query, (err, rows) => {
      connection.release();

      if (err || rows.length === 0) {
        const data = {
          ok: false,
          message: "Couldn't find post.",
        };

        res.send(data);
        res.end();
      } else {
        const data = {
          ok: true,
          message: 'Post found.',
          post: rows[0],
        };

        res.send(data);
        res.end();
      }
    });
  });
});

module.exports = getSpecificPost;
