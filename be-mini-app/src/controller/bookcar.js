import { TimeCreate, DateCreate } from '../helper/time';
import { refreshToken } from '../helper/refreshToken';
import { newOrderBookcar } from '../helper/application';
import { generateBookingCode } from '../helper/randomcode';

const BookCar = {
	async createBookCar(c) {
		const body = await c.req.json();

		// const user = await c.env.DB.prepare('SELECT * FROM user WHERE idUser = ?').bind(body.iduser).all();
		// if (user.results.length === 0) {
		// 	return c.json({ success: false, message: 'Vui lòng đăng nhập vào app' }, 401);
		// }

		if (!body.iduser || !body.addressStart || !body.addressEnd || !body.vehicletype || !body.Paymentmethods) {
			return c.json({ message: 'Vui lòng đầy điền đù thông tin', success: false }, 400);
		}
		const timeCreate = TimeCreate();
		const codeBookcar = generateBookingCode();
		await c.env.DB.prepare(
			'INSERT INTO bookcar (idboo ,iduser, idrestaurant, addressStart, addressEnd, vehicletype, CreateDate, Paymentmethods) VALUES(?, ?, ?, ?, ?, ?, ?, ?)'
		)
			.bind(
				codeBookcar,
				body.iduser,
				body.idrestaurant,
				body.addressStart,
				body.addressEnd,
				body.vehicletype,
				timeCreate,
				body.Paymentmethods
			)
			.run();
		// const latsId = code;
		await c.env.DB.prepare('INSERT INTO Ordertracking (idbookacar) VALUES (?)').bind(codeBookcar).run();

		const token = await c.env.DB.prepare('SELECT * FROM token').all();
		let acctoken = token.results[0].access_token;

		const day = DateCreate();
		const data = {
			idbookcar: codeBookcar,
			time: day,
			username: body.username,
			userphone: body.userphone,
		};
		const response = await newOrderBookcar(c, acctoken, data);
		if (response.data.error === -124) {
			let Tokenrefresh = token.results[0].refresh_token;
			let idToken = token.results[0].id;
			const res = await refreshToken(c, Tokenrefresh);
			Tokenrefresh = res.data.refresh_token;
			acctoken = res.data.access_token;
			await c.env.DB.prepare('UPDATE token SET refresh_token = ?, access_token = ? WHERE id = ?')
				.bind(Tokenrefresh, acctoken, idToken)
				.run();
			await newOrderBookcar(c, acctoken, data);
		}

		return c.json({ success: true, message: 'Đặt đơn thành công', response });
	},

	async getBookCar(c) {
		const iduser = await c.req.param('id');
		if (!iduser) {
			return c.json({ message: 'Người dùng không hợp lệ vui lòng đăng nhập', success: false }, 401);
		}

		const sql =
			'SELECT * FROM bookcar as bk JOIN Ordertracking as ord ON ord.idbookacar = bk.idboo JOIN driver as dr ON dr.idUser = ord.IDdriver WHERE bk.iduser = ?';
		const userBookcar = await c.env.DB.prepare(sql).bind(iduser).all();

		return c.json(userBookcar.results);
	},

	async detailBookcar(c) {
		const idBookcar = await c.req.param('IDbookcar');

		if (!idBookcar) {
			return c.json({ message: 'Đơn đặt xe không tồn tại', success: false }, 404);
		}
		const sql =
			'SELECT driver.idUser as idDriver  ,ord.idbookacar, addressStart, addressEnd, vehicletype, Paymentmethods, SumPayable, name, CreateDate, nameDriver, phoneDriver, Orderstatus, phone, driverMoney, avatar, idrestaurant FROM bookcar JOIN user ON user.idUser = bookcar.iduser JOIN Ordertracking ord ON bookcar.idboo = ord.idbookacar JOIN driver ON ord.IDdriver = driver.idUser WHERE idboo = ?';

		const result = await c.env.DB.prepare(sql).bind(idBookcar).all();

		return c.json(result.results);
	},
};

export default BookCar;
