const mongoose = require('mongoose');
const User = require('./User');
const Comment = require('./Comments');

const DiscussionSchema = new mongoose.Schema(
	{
		text: String,
		image: String,
		hashTags: [ String ],
		createdOn: { type: Date, default: Date.now },
		user: { type: mongoose.Schema.Types.ObjectId, ref: User },
		comments: [ { type: mongoose.Schema.Types.ObjectId, ref: Comment } ],
		likes: [ { type: mongoose.Schema.Types.ObjectId, ref: User } ],
		viewCount: { type: Number, default: 0 }
	},
	{ timestamps: true }
);

const discussions = mongoose.models.discussions || mongoose.model('discussions', DiscussionSchema);
module.exports = discussions;
