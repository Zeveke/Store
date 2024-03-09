const mongoose = require("mongoose");
const mapComment = require("./mapComment");

module.exports = function (product) {
	return {
		id: product._id,
		title: product.title,
		specs: product.specs,
		price: product.price,
		vendor: product.vendor,
		parent: product.parent.title,
		comments: product.comments.map((comment) =>
			mongoose.isObjectIdOrHexString(comment) ? comment : mapComment(comment)
		),
		publicId: product._publicId,
		vendorCode: product.vendor_code,
		previewImageUrl: product.preview_image_url,
	};
};
