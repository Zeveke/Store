const authController = require("./auth.controller");
const usersController = require("./users.controller");
const rolesController = require("./roles.controller");
const ordersController = require("./orders.controller");
const productsController = require("./products.controller");
const commentsController = require("./comments.controller");
const categoriesController = require("./categories.controller");
const subcategoriesController = require("./subcategories.controller");

module.exports = {
	authController,
	usersController,
	rolesController,
	ordersController,
	productsController,
	commentsController,
	categoriesController,
	subcategoriesController,
};
