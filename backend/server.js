require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./configs/dbConn');
const mongoose = require('mongoose');
const discussionRoutes = require('./routes/discussionRoutes');
const commentRoutes = require('./routes/commentRoutes');
const PORT = process.env.PORT || 3500;

connectDB();

app.use(express.json());

app.use('/', require('./routes/root'));

app.use('/users', require('./routes/userRoutes'));

app.use('/discussions', discussionRoutes);

app.use('/comments', commentRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connection.once('open', () => {
	//LESSON 3
	console.log('Connected to MongoDB');
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

mongoose.connection.on('error', (err) => {
	console.log(err);
});
