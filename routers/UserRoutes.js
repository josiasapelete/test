const { getAllUsers, getUser, updateUser, deleteUser, followUser, unfollowUser } = require('../Controllers/UserController');

const router=require('express').Router();

router.get('/',getAllUsers);
router.get('/:id',getUser);
router.put('/update/:id',updateUser);
router.delete('/delete/:id',deleteUser);
router.patch('/follow/:id',followUser);
router.patch('/unfollow/:id',unfollowUser)

module.exports= router