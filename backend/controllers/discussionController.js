const asyncHandler = require('express-async-handler');
const Discussion = require('../models/Discussions');
const Comment = require('../models/Comments');

const createDiscussion = asyncHandler(async (req, res) => {
	try {
		const { text, image, hashTags, createdOn, user, likes, viewCount } = req.body;

		if (!text || !image || !hashTags || !createdOn || !user || !likes || !viewCount) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const discussionObject = { text, image, hashTags, createdOn, user, likes, viewCount };

		const discussion = await Discussion.create(discussionObject);
		await discussion.save();
		res.status(201).send(`${discussionObject.text} a discussion is created`);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const getDiscussion = asyncHandler(async (req, res) => {
	try {
		const query = {};
		if (req.query.tags) {
			query.hashTags = { $in: req.query.tags.split(',') };
		}
		if (req.query.text) {
			query.text = { $regex: req.query.text, $options: 'i' };
		}
		const discussions = await Discussion.find(query).populate('user').populate('comments');
		res.json(discussions);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const updateDiscussion = asyncHandler(async (req, res) => {
	try {
		await Discussion.findByIdAndUpdate(req.params.id, req.body);
		res.send('Discussion updated');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const deleteDiscussion = asyncHandler(async (req, res) => {
	try {
		await Discussion.findByIdAndDelete(req.params.id);
		res.send('Discussion deleted');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const likedDiscussion = asyncHandler(async (req, res) => {
	try {
		const discussion = await Discussion.findById(req.params.id);
		discussion.likes.push(req.body.userId);
		await discussion.save();
		res.send(`${discussion.text} is liked`);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const commentAdded = asyncHandler(async (req, res) => {
	try {
		const comment = new Comment(req.body);
		await comment.save();
		const discussion = await Discussion.findById(req.params.id);
		discussion.comments.push(comment._id);
		await discussion.save();
		res.status(201).send('Comment added');
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

module.exports = {
	createDiscussion,
	getDiscussion,
	updateDiscussion,
	deleteDiscussion,
	likedDiscussion,
	commentAdded
};
