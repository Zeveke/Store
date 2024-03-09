const Comment = require("../models/Comment.model");
const Product = require("../models/Product.model");
const { mapComment } = require("../helpers");

const commentsController = {
	get: async (productId, res) => {
		try {
			const commentsData = await Product.findById(productId).populate(
				"comments"
			);

			res.send({ data: commentsData.comments });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	create: async (productId, comment, res) => {
		try {
			const newComment = await Comment.create(comment);

			await Product.findByIdAndUpdate(productId, {
				$push: { comments: newComment },
			});

			await newComment.populate("author");

			res.send({ data: mapComment(newComment) });

			return newComment;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	update: async (commentId, comment, res) => {
		try {
			const updatedComment = await Comment.findByIdAndUpdate(
				commentId,
				comment,
				{
					returnDocument: "after",
				}
			);

			await updatedComment.populate("author");

			res.send({ data: mapComment(updatedComment) });

			return updatedComment;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	delete: async (productId, commentId, res) => {
		try {
			await Comment.deleteOne({ _id: commentId });

			await Product.findByIdAndUpdate(productId, {
				$pull: { comments: commentId },
			});

			res.send({ error: null });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = commentsController;
