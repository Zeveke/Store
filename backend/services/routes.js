const baseUrl = "/api/";

const routes = {
	auth: {
		register: `${baseUrl}register`,
		login: `${baseUrl}login`,
		logout: `${baseUrl}logout`,
	},
	usersManagement: {
		get: `${baseUrl}users`,
		update: `${baseUrl}users/:userId/update`,
		delete: `${baseUrl}users/:userId/delete`,
	},
	rolesManagement: {
		get: `${baseUrl}roles`,
	},
	categoriesManagement: {
		get: `${baseUrl}categories`,
		create: `${baseUrl}categories/create`,
		update: `${baseUrl}categories/:categoryId/update`,
		delete: `${baseUrl}categories/:categoryId/delete`,
	},
	subcategoriesManagement: {
		get: `${baseUrl}categories/:categoryId/subcategories`,
		create: `${baseUrl}categories/:categoryId/subcategories/create`,
		update: `${baseUrl}subcategories/:subcategoryId/update`,
		delete: `${baseUrl}subcategories/:subcategoryId/delete`,
	},
	productsManagement: {
		get: `${baseUrl}products`,
		getOne: `${baseUrl}products/:productId`,
		create: `${baseUrl}subcategories/:subcategoryId/products/create`,
		update: `${baseUrl}products/:productId/update`,
		delete: `${baseUrl}products/:productId/delete`,
		getSortedByAsc: `${baseUrl}subcategories/:subcategoryId/products/sort_asc`,
		getSortedByDesc: `${baseUrl}subcategories/:subcategoryId/products/sort_desc`,
		getSortedAllByAsc: `${baseUrl}sort_asc/products`,
		getSortedAllByDesc: `${baseUrl}sort_desc/products`,
		getAllFromSubcategory: `${baseUrl}subcategories/:subcategoryId/products`,
	},
	commentsManagement: {
		get: `${baseUrl}products/:productId/comments`,
		create: `${baseUrl}products/:productId/comments/create`,
		update: `${baseUrl}comments/:commentId/update`,
		delete: `${baseUrl}products/:productId/comments/:commentId/delete`,
	},
	ordersManagement: {
		get: `${baseUrl}orders/:userId`,
		create: `${baseUrl}orders/:userId/create`,
	},
};

module.exports = routes;
