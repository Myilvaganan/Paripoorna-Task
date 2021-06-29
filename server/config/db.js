const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

const db = process.env.DATABASE_URI;
const connectDB = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true
		});

		console.log('MongoDB Connected...');
	} catch (error) {
		console.error(error.message);
		// Exit process with failure
		process.exit(1);
	}
};

module.exports = connectDB;
