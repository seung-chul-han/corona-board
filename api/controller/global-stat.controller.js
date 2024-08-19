const { GlobalStat } = require('../database');
const { wrapWithErrorHandler } = require('../util');

// 데이터 조회
const getAll = async (req, res) => {
	const result = await GlobalStat.findAll();
	res.status(200).json({ result });
};

// 데이터 삽입 또는 업데이트
const insertOrUpdate = async (req, res) => {
	const { cc, date } = req.body;
	if (!cc || !date) {
		res.status(400).json({ error: 'cc and date are required' });
		return;
	}

	const count = await GlobalStat.count({ where: { cc, date } });

	count === 0
		? await GlobalStat.create(req.body)
		: await GlobalStat.update(req.body, { where: { cc, date } });

	res.status(200).json({ result: 'success' });
};

// 데이터 삭제
const remove = async (req, res) => {
	const { cc, date } = req.body;

	if (!cc || !date) {
		res.status(400).json({ error: 'cc and date are required' });
		return;
	}

	await GlobalStat.destroy({
		where: { cc, date },
	});

	res.status(200).json({ result: 'success' });
};

module.exports = wrapWithErrorHandler({
	getAll,
	insertOrUpdate,
	remove,
});
