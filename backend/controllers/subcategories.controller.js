const Category = require("../models/Category.model");
const Subcategory = require("../models/Subcategory.model");
const { mapSubcategory } = require("../helpers");

const subcategoriesController = {
	get: async (categoryId, res) => {
		try {
			const subcategories = await Subcategory.find({
				parent: categoryId,
			}).populate("parent");

			res.send({ data: subcategories.map(mapSubcategory) });
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	create: async (categoryId, title, res) => {
		try {
			const newSubcategory = await Subcategory.create({
				parent: categoryId,
				title,
			});

			await Category.findByIdAndUpdate(categoryId, {
				$push: { subcategories: newSubcategory },
			});

			await newSubcategory.populate("parent");

			res.send({ data: mapSubcategory(newSubcategory) });

			return newSubcategory;
		} catch (e) {
			if (e.code === 11000) {
				return res
					.status(400)
					.send({ error: "Подкатегория с таким именем уже существует!" });
			}

			res.status(400).send({ error: e.message });
			res.status(500).send({ error: e.message });
		}
	},
	update: async (subcategoryId, subcategory, res) => {
		try {
			const updatedSubcategory = await Subcategory.findByIdAndUpdate(
				subcategoryId,
				subcategory,
				{
					returnDocument: "after",
				}
			);

			await updatedSubcategory.populate({
				path: "products",
				populate: "parent",
			});

			res.send({ data: mapSubcategory(updatedSubcategory) });

			return updatedSubcategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
	delete: async (subcategoryId, res) => {
		try {
			const deletedSubcategory = await Subcategory.deleteOne({
				_id: subcategoryId,
			});

			res.send({ error: null });

			return deletedSubcategory;
		} catch (e) {
			res.send({ error: e.message });
		}
	},
};

module.exports = subcategoriesController;
