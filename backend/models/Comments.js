const mongoose = require('mongoose');
const User = require('./User');
// const Comment = require('');

const CommentSchema = new mongoose.Schema(
	{
		text: String,
		user: { type: mongoose.Schema.Types.ObjectId, ref: User },
		createdOn: { type: Date, default: Date.now },
		likes: [ { type: mongoose.Schema.Types.ObjectId, ref: User } ],
		replies: [ { type: mongoose.Schema.Types.ObjectId } ]
	},
	{ timestamps: true }
);

const comments = mongoose.models.comments || mongoose.model('comments', CommentSchema);
module.exports = comments;
