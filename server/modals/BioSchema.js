const mongoose = require('mongoose');

const User = mongoose.Schema({
	profilePicture: {
		type: String,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	mobile: {
		type: String,
		required: true
	},
	location: {
		type: String,
		required: true
	},
	dateOfBirth: {
		type: Date,
		required: true
	},
	jobType: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('User', User);
