const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signupUser = asyncHandler(async (req, res) => {
	try {
		const { name, mobileNo, email, password } = req.body;

		if (!name || !mobileNo || !email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const userObject = { name, mobileNo, email, password: hashedPassword };

		//Create and store new user
		const user = await User.create(userObject);
		await user.save();
		console.log('User created');
		res.status(201).json({ message: `New user ${name} created` });
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const loginUser = asyncHandler(async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (user && (await bcrypt.compare(password, user.password))) {
			const token = jwt.sign({ userId: user._id }, 'SECRET_KEY');
			res.send({ token });
			// res.send(user);
		} else {
			res.status(401).send('Invalid credentials');
		}
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const updateUser = asyncHandler(async (req, res) => {
	await User.findByIdAndUpdate(req.params.id, req.body);
	res.send('User updated');
});

const deleteUser = asyncHandler(async (req, res) => {
	await User.findByIdAndDelete(req.params.id);
	res.send('User deleted');
});

const getAllUsers = asyncHandler(async (req, res) => {
	try {
		const users = await User.find();
		if (!users.length) {
			return res.status(400).json({ message: 'No users found' });
		}
		res.json(users);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const searchUser = asyncHandler(async (req, res) => {
	const users = await User.find({ name: new RegExp(req.query.name, 'i') });
	res.send(users);
});

const followUser = asyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		console.log(user);
		user.followers.push(req.body.followerId);
		await user.save();

		const follower = await User.findById(req.body.followerId);
		follower.following.push(req.params.id);
		await follower.save();

		res.send(`${user.name} has been followed by ${follower.name}`);
	} catch (error) {
		console.log(error);
		return res.json({ message: 'Internal server error' });
	}
});

const unfollowUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);
	user.followers.pull(req.body.followerId);
	await user.save();

	const follower = await User.findById(req.body.followerId);
	follower.following.pull(req.params.id);
	await follower.save();

	res.send(`${user.name} has unfollowed ${follower.name}`);
});

module.exports = {
	signupUser,
	loginUser,
	updateUser,
	deleteUser,
	getAllUsers,
	searchUser,
	followUser,
	unfollowUser
};
