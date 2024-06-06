const express = require('express');
const router = express.Router();
const discussionController = require('../controllers/discussionController');

router.route('/').post(discussionController.createDiscussion);

router.route('/:id').put(discussionController.updateDiscussion);

router.route('/:id').delete(discussionController.deleteDiscussion);

router.route('/').get(discussionController.getDiscussion);

router.route('/:id/like').post(discussionController.likedDiscussion);

router.route('/:id/comment').post(discussionController.commentAdded);

module.exports = router;
