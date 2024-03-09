const mongoose = require("mongoose");
const mapOrder = require("./mapOrder");

module.exports = function (user) {
	return {
		id: user._id,
		name: user.name,
		email: user.email,
		roleId: user.role,
		orders: user.orders.map((order) =>
			mongoose.isObjectIdOrHexString(order) ? order : mapOrder(order)
		),
		registeredAt: user.createdAt,
	};
};
