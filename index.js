const app = require('./express/app');
const included = require('./mysql/included');

app.use(
  included.createPost,
  included.deletePost,
  included.getAllPosts,
  included.getSpecificPost,
  included.updatePost
);
