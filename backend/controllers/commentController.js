const Comment = require('../models/Comments');
const asyncHandler = require('express-async-handler');

const commentLiked = asyncHandler(async (req, res) => {
	try {
		const comment = await Comment.findById(req.params.id);
		comment.likes.push(req.body.userId);
		await comment.save();
		res.send('Comment liked');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const updateComment = asyncHandler(async (req, res) => {
	try {
		await Comment.findByIdAndUpdate(req.params.id, req.body);
		res.send('Comment updated');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const deleteComment = asyncHandler(async (req, res) => {
	try {
		await Comment.findByIdAndDelete(req.params.id);
		res.send('Comment deleted');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const addReply = asyncHandler(async (req, res) => {
	try {
		const reply = new Comment(req.body);
		await reply.save();
		const comment = await Comment.findById(req.params.id);
		comment.replies.push(reply._id);
		await comment.save();
		res.status(201).send('Reply added');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

module.exports = {
	commentLiked,
	updateComment,
	deleteComment,
	addReply
};
