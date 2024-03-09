const bcrypt = require("bcrypt");
const User = require("../models/User.model");
const { mapUser } = require("../helpers");
const { generate } = require("../services/token");

const authController = {
	register: async (email, name, password, res) => {
		try {
			if (!password) {
				throw new Error("Пароль пустой");
			}

			const passwordHash = await bcrypt.hash(password, 10);

			const user = await User.create({
				email,
				name,
				password: passwordHash,
			});

			const token = generate({ id: user.id });

			res
				.cookie("token", token, { httpOnly: true })
				.send({ error: null, user: mapUser(user) });

			return { user, token };
		} catch (e) {
			if (e.code === 11000) {
				return res
					.status(400)
					.send({ error: "Такой пользователь уже существует!" });
			}

			// res.status(400).send({ error: e.message });
			res.status(500).send({ error: e.message });
		}
	},
	login: async (email, password, res) => {
		try {
			const user = await User.findOne({ email }).populate("orders");

			if (!user) {
				throw new Error("Пользователь не найден");
			}

			const isPasswordMatch = await bcrypt.compare(password, user.password);

			if (!isPasswordMatch) {
				throw new Error("Неверный пароль");
			}

			const token = generate({ id: user.id });

			res
				.cookie("token", token, { httpOnly: true })
				.send({ error: null, user: mapUser(user) });

			return { token, user };
		} catch (e) {
			res.send({ error: e.message || "login: Неизвестная ошибка" });
		}
	},
	logout: (res) => {
		res.cookie("token", "", { httpOnly: true }).send({});
	},
};

module.exports = authController;
