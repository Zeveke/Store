module.exports = function (comment) {
	return {
		id: comment._id,
		content: comment.content,
		authorName: comment.author.name,
		authorRoleId: comment.author.role,
		publishedAt: comment.createdAt,
		updatedAt: comment.updatedAt,
	};
};
