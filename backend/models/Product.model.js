const mongoose = require("mongoose");
const validator = require("validator");
const { generatePublicId } = require("../utils");

const ProductSchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	specs: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	vendor: {
		type: String,
		required: true,
	},
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Subcategory",
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment",
		},
	],
	_publicId: {
		type: String,
		default: generatePublicId(100000, 900000),
	},
	vendor_code: {
		type: String,
		required: true,
	},
	preview_image_url: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: "URL-адрес изображения невалиден",
		},
	},
});

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
