const mongoose = require("mongoose");
const mapSubcategory = require("./mapSubcategory");

module.exports = function (category) {
	return {
		id: category._id,
		title: category.title,
		subcategories: category.subcategories.map((subcategory) =>
			mongoose.isObjectIdOrHexString(subcategory)
				? subcategory
				: mapSubcategory(subcategory)
		),
	};
};
