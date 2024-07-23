import { all } from 'axios';

const User = {
	async getUser(c) {
		const user = await c.env.DB.prepare('SELECT * FROM user ').all();
		return c.json(user.results);
	},

	async userCurrent(c) {
		const body = await c.req.json();
		let user = await c.env.DB.prepare('SELECT * FROM user WHERE idUser = ? ').bind(body.id).all();

		if (user.results.length === 0) {
			if (!body.followedOA) {
				const inserted = await c.env.DB.prepare('INSERT INTO user (idUser, name, phone, avatar, isSensitive) VALUES(?, ?, ?, ?, ?)')
					.bind(body.id, body.name, body.phone, body.avatar, body.isSensitive)
					.run();

				const usercurrent = await c.env.DB.prepare('SELECT * FROM user WHERE id = ?').bind(inserted.meta.last_row_id).all();

				const users = usercurrent.results[0];
				const news = {
					...users,
				};
				return c.json({
					...news,
				});
			} else {
				const inserted = await c.env.DB.prepare(
					'INSERT INTO user (idUser, name, phone, avatar, isSensitive, followedOA) VALUES(?, ?, ?, ?, ?, ?)'
				)
					.bind(body.id, body.name, body.phone, body.avatar, body.isSensitive, body.followedOA)
					.run();

				const usercurrent = await c.env.DB.prepare('SELECT * FROM user WHERE id = ?').bind(inserted.meta.last_row_id).all();
				const users = usercurrent.results[0];
				const news = {
					...users,
				};
				return c.json({
					...news,
				});
			}
		}
		return c.json({
			...user.results[0],
		});
	},

	async historyBookcar(c) {
		const idUser = await c.req.param('idUser');
		const sql =
			'SELECT ord.idbookacar, addressStart, addressEnd, vehicletype, Paymentmethods, SumPayable, name, CreateDate, nameDriver, phoneDriver, Orderstatus FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking ord ON bookcar.idboo = ord.idbookacar JOIN driver ON ord.IDdriver = driver.idUser  WHERE bookcar.iduser = ?  ORDER BY bookcar.idbookcars DESC';

		const history = await c.env.DB.prepare(sql).bind(idUser).all();

		const orderstatus = await c.env.DB.prepare(
			'SELECT ord.idbookacar, addressStart, addressEnd, vehicletype, Paymentmethods, name, CreateDate, Orderstatus FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking ord ON bookcar.idboo = ord.idbookacar WHERE bookcar.iduser = ? AND Orderstatus = 2  ORDER BY ord.idbookacar DESC'
		)
			.bind(idUser)
			.all();
		const combinedArray = orderstatus.results.concat(history.results);
		return c.json(combinedArray);
	},

	async statusBookcar(c) {
		const idUser = await c.req.param('idUser');

		const sql =
			'SELECT * FROM bookcar JOIN Ordertracking ON bookcar.idboo = Ordertracking.idbookacar JOIN driver ON Ordertracking.IDdriver = driver.idUser WHERE bookcar.idUser = ? AND Ordertracking.Orderstatus IN (1, 3)   ';
		const status = await c.env.DB.prepare(sql).bind(idUser).all();

		return c.json(status.results);
	},
};

export default User;
