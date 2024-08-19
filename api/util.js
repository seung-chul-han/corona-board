const errorHandler = (block) => async (req, res) => {
	try {
		await block(req, res);
	} catch (error) {
		res.status(500).json({ error: error.toString() });
	}
};

const wrapWithErrorHandler = (obj) => {
	Object.keys(obj).forEach((key) => {
		obj[key] = errorHandler(obj[key]);
	});
	return obj;
};

module.exports = {
	wrapWithErrorHandler,
};
