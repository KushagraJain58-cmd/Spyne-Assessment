const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

router.route('/:id/like').post(commentController.commentLiked);

router.route('/:id').put(commentController.updateComment);
router.route('/:id').delete(commentController.deleteComment);
router.route('/:id/reply').post(commentController.addReply);

module.exports = router;
