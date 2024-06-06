const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
	name: String,
	mobileNo: { type: String, unique: true },
	email: { type: String, unique: true },
	password: String,
	followers: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
	following: [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
});

const users = mongoose.models.users || mongoose.model('users', UserSchema);
module.exports = users;
