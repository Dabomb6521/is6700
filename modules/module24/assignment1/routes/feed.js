const express = require('express');

const feedController = require('../controllers/feed');

const router = express.Router();

// GET /fee/posts
router.get('/posts', feedController.getPosts);

// POST /feed/post
router.post('/post', feedController.createPost);
router.put('/posts/:id', feedController.updatePost);
router.delete('/posts/:id', feedController.deletePost);

module.exports = router;