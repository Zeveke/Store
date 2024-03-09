const Order = require("../models/Order.model");
const { mapOrder } = require("../helpers");
const User = require("../models/User.model");

const ordersController = {
	get: async (userId, res) => {
		try {
			const ordersData = await User.findById(userId).populate("orders");

			await ordersData.populate({
				path: "orders.products.product",
				model: "Product",
			});

			res.send({ data: ordersData.orders.map(mapOrder) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	create: async (userId, order, res) => {
		try {
			const newOrder = await Order.create(order);

			await User.findByIdAndUpdate(userId, {
				$push: { orders: newOrder },
			});

			await newOrder.populate({
				path: "products.product",
				model: "Product",
			});

			res.send({ data: mapOrder(newOrder), error: null });

			return newOrder;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = ordersController;
