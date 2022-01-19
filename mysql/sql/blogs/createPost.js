const express = require('express');
const pool = require('../../pool');
const router = express.Router();

const createPost = router.post(`/`, (req, res) => {
  const post = req.body;
  const insertQuery = `INSERT INTO blogs (title,description,image) VALUES ('${post.title}','${post.description}','${post.image}');`;
  const id = req.params.id;

  console.log(post, id);
  pool.getConnection((err, connection) => {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    connection.query(insertQuery, (err, rows) => {
      connection.release();
    });
  });
  res.status(201).send('Post recieved');
});

module.exports = createPost;
