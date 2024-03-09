const User = require("../models/User.model");
const { mapUser } = require("../helpers");

const usersController = {
	get: async (res) => {
		try {
			const users = await User.find();

			res.send({ data: users.map(mapUser) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	update: async (userId, roleId, res) => {
		const updatedUser = await User.findByIdAndUpdate(
			userId,
			{
				role: roleId,
			},
			{ returnDocument: "after" }
		);

		res.send({ data: mapUser(updatedUser) });

		return updatedUser;
	},
	delete: async (userId, res) => {
		try {
			await User.deleteOne({ _id: userId });

			res.send({ error: null });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = usersController;
