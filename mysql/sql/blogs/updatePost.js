const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const updatePost = router.post(`/update/:id`, (req, res) => {
  const post = req.body;
  const updateQuery = `UPDATE blogs SET title='${post.title}',description='${post.description}',image='${post.image}' WHERE id=${post.id};`;

  pool.getConnection((err, connection) => {
    if (err) {
      const data = {
        ok: false,
        message: 'Connection to database failed.',
      };

      res.send(data);
      res.end();
    } else {
      connection.query(updateQuery, (err, rows) => {
        connection.release();

        if (!err) {
          const data = {
            ok: true,
            message: 'Post updated.',
          };

          res.send(data);
          res.status(201);
          res.end();
        } else {
          const data = {
            ok: false,
            message: "Couldn't update post.",
          };

          res.send(data);
          res.end();
        }
      });
    }
  });
});

module.exports = updatePost;
