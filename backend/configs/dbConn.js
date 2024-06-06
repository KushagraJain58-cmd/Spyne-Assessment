// //LESSON 3
// const mongoose = require('mongoose');

// const connectDB = async () => {
// 	try {
// 		await mongoose.connect(process.env.MONGO_URI); //TO coneect to database
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
};

module.exports = connectDB;
