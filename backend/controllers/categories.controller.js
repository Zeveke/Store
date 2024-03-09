const Category = require("../models/Category.model");
const { mapCategory } = require("../helpers");

const categoriesController = {
	get: async (res) => {
		try {
			const categories = await Category.find();

			res.send({ data: categories.map(mapCategory) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	create: async (title, res) => {
		try {
			const newCategory = await Category.create({
				title,
			});

			await newCategory.populate({
				path: "subcategories",
				populate: "parent",
			});

			res.send({ data: mapCategory(newCategory) });

			return newCategory;
		} catch (e) {
			if (e.code === 11000) {
				return res
					.status(400)
					.send({ error: "Категория с таким именем уже существует!" });
			}

			res.status(400).send({ error: e.message });
			res.status(500).send({ error: e.message });
		}
	},
	update: async (categoryId, category, res) => {
		try {
			const updatedCategory = await Category.findByIdAndUpdate(
				categoryId,
				category,
				{
					returnDocument: "after",
				}
			);

			await updatedCategory.populate({
				path: "subcategories",
				populate: "parent",
			});

			res.send({ data: mapCategory(updatedCategory) });

			return updatedCategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	delete: async (categoryId, res) => {
		try {
			const deletedCategory = await Category.deleteOne({ _id: categoryId });

			res.send({ error: null });

			return deletedCategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = categoriesController;
