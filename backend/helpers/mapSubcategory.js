const mongoose = require("mongoose");
const mapProduct = require("./mapProduct");

module.exports = function (subcategory) {
	return {
		id: subcategory._id,
		parent: subcategory.parent.title,
		title: subcategory.title,
		products: subcategory.products.map((product) =>
			mongoose.isObjectIdOrHexString(product) ? product : mapProduct(product)
		),
	};
};
