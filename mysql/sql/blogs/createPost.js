const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const createPost = router.post(`/create`, (req, res) => {
  const post = req.body;
  const insertQuery = `INSERT INTO blogs (title,description,image) VALUES ('${post.title}','${post.description}','${post.image}');`;

  console.log('post ->', post);
  if (!post.title || !post.description || !post.image) {
    const data = {
      ok: false,
      message: 'All fields must contain some data.',
    };

    res.send(data);
    res.end();
  } else {
    pool.getConnection((err, connection) => {
      if (err) {
        const data = {
          ok: false,
          message: 'Connection to database failed.',
        };

        res.send(data);
        res.end();
      } else {
        connection.query(insertQuery, (err, rows) => {
          connection.release();

          if (err) {
            const data = {
              ok: false,
              message: 'Database failed.',
            };

            res.send(data);
          } else {
            const data = {
              ok: true,
              message: 'Post created.',
            };

            res.send(data);
          }
        });
      }
    });
  }
});

module.exports = createPost;
