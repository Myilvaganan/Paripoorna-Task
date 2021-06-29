const mongoose = require('mongoose');

const User = require('../modals/BioSchema');

const getBio = async (req, res) => {
	try {
		const data = await User.find().sort({ createdAt: -1 });

		res.status(200).json(data);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

const createBio = async (req, res) => {
	const data = req.body;
	const email = data.email;
	try {
		const user = await User.findOne({ email });
		if (user) {
			return res.status(404).json({ message: `User with mail id ${data.email} already exists` });
		}
		const newData = new User(data);

		await newData.save();
		res.status(201).json(newData);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

const editBio = async (req, res) => {
	const { id } = req.params;
	const { name, location, mobile, profilePicture, jobType, email, dateOfBirth } = req.body;

	try {
		if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Bio with this ${id}`);

		const updatedData = { name, location, email, mobile, profilePicture, dateOfBirth, jobType, _id: id };

		await User.findByIdAndUpdate(id, updatedData, { new: true });
		res.json(updatedData);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
};

const deleteBio = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No Bio with id: ${id} is available`);

	await User.findByIdAndRemove(id);

	res.json({ message: `Bio with id ${id} is deleted successfully.` });
};

module.exports = { createBio, editBio, getBio, deleteBio };
