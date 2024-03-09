const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

module.exports = {
	generate(data) {
		return jwt.sign(data, secret, { expiresIn: "30d" });
	},
	verify(token) {
		if (!token) {
			throw new Error("Только для авторизованных пользователей");
		}

		return jwt.verify(token, secret);
	},
};
