const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
	title: {
		type: String,
		required: true,
		unique: true,
	},
	subcategories: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Subcategory",
		},
	],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
