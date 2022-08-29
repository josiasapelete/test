const { createPost, getPost, updatePost, deletePost, likePost, getTimelinePosts } = require('../Controllers/PostController');

const router= require('express').Router();

router.post('/',createPost)
router.get('/:id',getPost);
router.put('/:id',updatePost);
router.delete('/:id',deletePost);
router.patch('/:id',likePost);
router.get('/timeline/:id',getTimelinePosts)




module.exports= router;