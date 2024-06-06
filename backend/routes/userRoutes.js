const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.route('/signup').post(userController.signupUser);

router.route('/login').post(userController.loginUser);

router.route('/:id').put(userController.updateUser);

router.route('/:id').delete(userController.deleteUser);

router.route('/').get(userController.getAllUsers);

router.route('/search').get(userController.searchUser);

router.route('/:id/follow').post(userController.followUser);

router.route('/:id/unfollow').post(userController.unfollowUser);

module.exports = router;
