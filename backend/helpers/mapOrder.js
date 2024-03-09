const mongoose = require("mongoose");
const mapProduct = require("./mapProduct");

module.exports = function (order) {
	return {
		id: order._id,
		publicOrderId: order.public_order_id,
		products: order.products.map((item) => {
			return {
				product: mongoose.isObjectIdOrHexString(item.product)
					? item.product
					: mapProduct(item.product),
				productCount: item.product_count,
			};
		}),
		totalCount: order.total_count,
		totalPrice: order.total_price,
		orderedAt: order.createdAt,
	};
};
