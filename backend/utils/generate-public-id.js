let usedIds = new Set();

const generatePublicId = (min, max) => {
	const range = max - min;

	const id = Math.floor(Math.random() * range) + min;

	usedIds.add(id);

	return id;
};

module.exports = generatePublicId;
