let posts = [];

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: posts,
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  const newPost = { id: posts.length + 1, title: title, content: content };

  posts.push(newPost);

  // Create post in db
  res.status(201).json({
    message: "Post created Successfully!",
    post: newPost,
  });
};

exports.updatePost = (req, res, next) => {
  const post = posts.find(p => p.id == req.params.id);
  post.title = req.body.title;
  post.content = req.body.content;

  res.status(201).json({
    message: "Post updated Successfully!",
    post: post
  });
};

exports.deletePost = (req, res, next) => {
  posts = posts.filter(p => p.id != req.params.id);

  res.status(200).json({
    message: "Post deleted Successfully!",
    posts: posts
  })
}
