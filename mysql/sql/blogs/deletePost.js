const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const deletePost = router.get(`/delete/:id`, (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM blogs WHERE id=${id}`;

  pool.getConnection((err, connection) => {
    if (err) {
      const data = {
        ok: false,
        message: 'Connection to database failed.',
      };

      res.send(data);
      res.end();
    } else {
      connection.query(deleteQuery, (err, rows) => {
        connection.release();

        if (err) {
          const data = {
            ok: false,
            message: "Couldn't delete post.",
          };

          res.send(data);
          res.end();
        } else {
          const data = {
            ok: true,
            message: 'Post deleted.',
          };

          res.send(data);
          res.end();
        }
      });
    }
  });
});

module.exports = deletePost;
