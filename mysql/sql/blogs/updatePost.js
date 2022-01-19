const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const updatePost = router.post(`/update/:id`, (req, res) => {
  const post = req.body;
  const updateQuery = `UPDATE blogs SET title='${post.title}',description='${post.description}',image='${post.image}' WHERE id=${post.id};`;

  console.log(updateQuery);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(updateQuery, (err, rows) => {
      connection.release();
    });
  });
  res.status(201).send('Post recieved');
});

module.exports = updatePost;
