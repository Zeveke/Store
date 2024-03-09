const mongoose = require("mongoose");
const { generatePublicId } = require("../utils");

const OrderSchema = mongoose.Schema(
	{
		public_order_id: {
			type: String,
			default: generatePublicId(1000000, 9000000),
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
				},
				product_count: {
					type: Number,
					required: true,
				},
			},
		],
		total_count: {
			type: Number,
			required: true,
		},
		total_price: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
