const mongoose = require("mongoose");

const SubcategorySchema = mongoose.Schema({
	parent: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
	},
	title: {
		type: String,
		required: true,
		unique: true,
	},
	products: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Product",
		},
	],
});

const Subcategory = mongoose.model("Subcategory", SubcategorySchema);

module.exports = Subcategory;
