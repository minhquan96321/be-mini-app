import { application } from '../../helper/application';
import { refreshToken } from '../../helper/refreshToken';

const managerBookcar = {
	async getNewOrder(c) {
		const sql =
			'SELECT addressStart, addressEnd, vehicletype, Paymentmethods, CreateDate, user.idUser, name, idbookacar, Orderstatus, avatar, phone  FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking ON Ordertracking.idbookacar = bookcar.idboo WHERE Orderstatus = 2 ORDER BY idbookcars DESC ';

		const rus = await c.env.DB.prepare(sql).all();

		return c.json(rus.results);
	},

	async orderTransfer(c) {
		const body = await c.req.json();

		if (!body.IDdriver || !body.idbookcar) {
			return c.json({ success: false, message: 'Vui lòng điền đầy đủ thông tin' }, 404);
		}
		const sqloder = 'UPDATE Ordertracking SET IDdriver = ?, Orderstatus = 3 WHERE idbookacar = ?';

		await c.env.DB.prepare(sqloder).bind(body.IDdriver, body.idbookcar).run();
		await c.env.DB.prepare('UPDATE driver SET DriverStatus = 1 WHERE idUser = ?').bind(body.IDdriver).run();
		const token = await c.env.DB.prepare('SELECT * FROM token').all();
		let acctoken = token.results[0].access_token;

		const response = await application(c, acctoken, body);

		if (response.data.error === -124) {
			let Tokenrefresh = token.results[0].refresh_token;
			let idToken = token.results[0].id;
			const res = await refreshToken(c, Tokenrefresh);
			Tokenrefresh = res.data.refresh_token;
			acctoken = res.data.access_token;
			await c.env.DB.prepare('UPDATE token SET refresh_token = ?, access_token = ? WHERE id = ?')
				.bind(Tokenrefresh, acctoken, idToken)
				.run();
			const result = await application(c, acctoken, body);
			return c.json({
				result,
				Tokenrefresh,
			});
		}

		return c.json({ success: true, message: 'Chuyển đơn đến tài xế thành công' });
	},

	async waitingCar(c) {
		const sql =
			'SELECT idbookacar, CreateDate, name, avatar, addressStart, addressEnd, phoneDriver, nameDriver, Faceimage as avatarDriver, vehicletype, Orderstatus, phone FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking on Ordertracking.idbookacar = bookcar.idboo JOIN driver ON Ordertracking.IDdriver = driver.idUser WHERE Orderstatus = 3 ORDER BY idbookcars DESC';
		const waitingcar = await c.env.DB.prepare(sql).all();

		return c.json(waitingcar.results);
	},

	async cancelOrder(c) {
		const idbookacar = await c.req.param('idbookacar');
		const sql = await c.env.DB.prepare('UPDATE Ordertracking SET Orderstatus = 4 WHERE idbookacar = ?').bind(idbookacar).run();

		return c.json({ sql }, 200);
	},

	async getCancelOrder(c) {
		const sql =
			'SELECT * FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking on Ordertracking.idbookacar = bookcar.idboo WHERE Orderstatus = 4';
		const canOder = await c.env.DB.prepare(sql).all();

		return c.json(canOder.results);
	},

	async receivedOrder(c) {
		const received = await c.env.DB.prepare(
			'SELECT idbookacar, IDdriver, Orderstatus, iduser, idrestaurant, addressStart, addressEnd, vehicletype, Paymentmethods, SumPayable, CreateDate FROM Ordertracking JOIN bookcar ON Ordertracking.idbookacar = bookcar.idboo WHERE Orderstatus = 1'
		).all();
		return c.json(received.results);
	},

	async completedOrder(c) {
		const sql =
			'SELECT SumPayable, Paymentmethods ,idbookacar ,name AS nameUser , addressStart, addressEnd, vehicletype, CreateDate, nameDriver, phone AS phoneUser , phoneDriver, Orderstatus, Faceimage AS avatarDriver, SpeedometerStart, SpeedometerEnd FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking on Ordertracking.idbookacar = bookcar.idboo JOIN driver ON Ordertracking.IDdriver = driver.idUser JOIN speedometer ON Ordertracking.idbookacar = speedometer.IdBookcar  WHERE Orderstatus = 0 ORDER BY idbookcars DESC';

		const complete = await c.env.DB.prepare(sql).all();
		return c.json(complete.results);
	},

	async confirmeOrder(c) {
		const sql =
			'SELECT avatar as avatarUser, idbookacar,name AS nameUser , addressStart, addressEnd, vehicletype, CreateDate, nameDriver, phone AS phoneUser , phoneDriver, Orderstatus, Faceimage AS avatarDriver FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking on Ordertracking.idbookacar = bookcar.idboo JOIN driver ON Ordertracking.IDdriver = driver.idUser  WHERE Orderstatus = 1';
		const confirme = await c.env.DB.prepare(sql).all();

		return c.json(confirme.results);
	},

	async monthlyRevenue(c) {
		const revenue = await c.env.DB.prepare(
			'SELECT idbookacar, idrestaurant, addressStart, addressEnd, Paymentmethods, SumPayable, CreateDate  FROM bookcar JOIN Ordertracking ON bookcar.idboo = Ordertracking.idbookacar WHERE Orderstatus = 0'
		).all();

		return c.json({ success: true, message: revenue.results });
	},

	async deleteBookcar(c) {
		const Idbookcar = await c.req.param('idbookcar');

		await c.env.DB.prepare('DELETE FROM bookcar WHERE idboo = ?').bind(Idbookcar).run();
		await c.env.DB.prepare('DELETE FROM Ordertracking WHERE idbookacar = ?').bind(Idbookcar).run();

		return c.json({ success: true, message: ' Xóa đơn thành công' });
	},
};

export default managerBookcar;
