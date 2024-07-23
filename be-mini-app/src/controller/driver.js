import axios from 'axios';
import { Base } from '../helper/baselark';
import { generateRandomCode } from '../helper/randomcode';
// import { statusOrder } from '../helper/application';
// import { refreshToken } from '../helper/refreshToken';
const Driver = {
	async createDriver(c) {
		const body = await c.req.json();

		const codewallet = generateRandomCode();
		// const check = await c.env.DB.prepare('SELECT * FROM driver WHERE idUser = ?').bind(body.idUser).all();
		// if (check.results.length > 0) {
		// 	await c.env.DB.prepare(
		// 		'UPDATE driver SET nameDriver = ?, email = ?,  phoneDriver = ? , address = ?, IDcard = ?, Faceimage = ?, DriverStatus = 0 WHERE idUser = ?'
		// 	).bind(body.Username, body.email, body.phoneNumber, body.address, body.IDcard, body.Faceimage, body.idUser);
		// 	await c.env.DB.prepare('UPDATE user SET isDriver = 1 WHERE idUser = ?').bind(body.idUser).run();
		// 	await c.env.DB.prepare('INSERT INTO electronicwallet(walletcode, idDriver) VALUES (?, ?)').bind(codewallet, body.idUser).run();
		// 	return c.json({ success: true, message: 'Đăng ký tài xế thành công' });
		// }
		const sql = 'INSERT INTO driver(idUser, nameDriver, email, phoneDriver, address, IDcard, Faceimage ) VALUES (?, ?, ?, ?, ?, ?, ?)';
		await c.env.DB.prepare(sql)
			.bind(body.idUser, body.Username, body.email, body.phoneNumber, body.address, body.IDcard, body.Faceimage)
			.run();
		await c.env.DB.prepare('INSERT INTO electronicwallet(walletcode, idDriver) VALUES (?, ?)').bind(codewallet, body.idUser).run();
		await c.env.DB.prepare('UPDATE user SET isDriver = 1 WHERE idUser = ?').bind(body.idUser).run();

		return c.json({ success: true, message: 'Đăng ký tài xế thành công' });
	},

	async getDriver(c) {
		const driver = await c.env.DB.prepare(
			'SELECT driver.idUser, nameDriver, phoneDriver, email, Faceimage as avataDriver, address, IDcard FROM driver JOIN user ON driver.idUser = user.idUser WHERE DriverStatus = 0 AND isDriver = 1'
		).all();
		return c.json(driver.results);
	},

	// async imageDriver(c) {
	// 	const body = await c.req.json();
	// 	const updates = [
	// 		c.env.DB.prepare('UPDATE driver SET frontdrivinglicense = ? WHERE idUser = ?').bind(body.frontdrivinglicense, body.idUser).run(),
	// 		c.env.DB.prepare('UPDATE driver SET backdrivinglicense  = ? WHERE idUser = ?').bind(body.backdrivinglicense, body.idUser).run(),
	// 		c.env.DB.prepare('UPDATE driver SET Faceimage = ? WHERE idUser = ?').bind(body.Faceimage, body.idUser).run(),
	// 		c.env.DB.prepare('UPDATE driver SET IDcardfront = ? WHERE idUser = ?').bind(body.IDcardfront, body.idUser).run(),
	// 		c.env.DB.prepare('UPDATE driver SET IDcarback = ? WHERE idUser = ?').bind(body.IDcarback, body.idUser).run(),
	// 	];

	// 	await Promise.all(updates)
	// 		.then(() => {
	// 			// All updates completed successfully
	// 			//  c.json('All updates completed.');
	// 		})
	// 		.catch((error) => {
	// 			// Handle errors if any promise rejects
	// 			// return c.json('Error updating records:', error);
	// 		});

	// 	return c.json({ success: true, message: 'Vui lòng chờ xét duyệt' });
	// },

	async confirmBookcar(c) {
		const body = await c.req.json();

		// if (!body.SpeedometerStart) {
		// 	return c.json({ message: 'Vui lòng chụp ảnh công tơ mét', success: false }, 401);
		// }
		// await c.env.DB.prepare('INSERT INTO speedometer(IdBookcar, SpeedometerStart) VALUES (?, ?)').bind(
		// 	body.idbookcar,
		// 	body.SpeedometerStart
		// );

		await c.env.DB.prepare('UPDATE Ordertracking SET Orderstatus = 1 WHERE idbookacar = ? ').bind(body.idbookcar).run();

		// const token = await c.env.DB.prepare('SELECT * FROM token').all();
		// let acctoken = token.results[0].access_token;

		// let datafile = {
		// 	...body,
		// 	status: 'Tài xế đã nhận đơn',
		// };
		// const response = await statusOrder(acctoken, datafile);
		// if (response.data.error === -124) {
		// 	let Tokenrefresh = token.results[0].refresh_token;
		// 	let idToken = token.results[0].id;
		// 	const res = await refreshToken(c, Tokenrefresh);
		// 	Tokenrefresh = res.data.refresh_token;
		// 	acctoken = res.data.access_token;
		// 	await c.env.DB.prepare('UPDATE token SET refresh_token = ?, access_token = ? WHERE id = ?')
		// 		.bind(Tokenrefresh, acctoken, idToken)
		// 		.run();
		// 	await statusOrder(acctoken, datafile);
		// 	datafile.phone = await c.env.PHONE_ADMIN;
		// 	await statusOrder(acctoken, datafile);
		// 	return c.json({ success: true, message: 'Nhận đơn thành công' });
		// }

		// datafile.phone = await c.env.PHONE_ADMIN;
		// await statusOrder(acctoken, datafile);

		return c.json({ success: true, message: 'Nhận đơn thành công' });
	},

	async newApplication(c) {
		const IDdriver = await c.req.param('IDdriver');
		const driver = await c.env.DB.prepare('SELECT idUser FROM driver WHERE idUser = ?').bind(IDdriver).all();
		if (driver.results.length === 0) {
			return c.json({ message: 'Vui lòng đăng nhập', success: false }, 401);
		}
		const sql =
			'SELECT * FROM Ordertracking JOIN bookcar ON Ordertracking.idbookacar = bookcar.idboo JOIN user ON user.idUser = bookcar.iduser  WHERE IDdriver = ? AND (Orderstatus = 3 OR Orderstatus = 1 OR Orderstatus = 5) ORDER BY bookcar.idbookcars DESC';
		const delivered = await c.env.DB.prepare(sql).bind(IDdriver).all();

		return c.json(delivered.results);
	},

	async historyBookcar(c) {
		const IDdriver = await c.req.param('IDdriver');
		if (!IDdriver) {
			return c.json({ message: 'Vui lòng đăng nhập', success: false }, 401);
		}

		const sql =
			'SELECT idbookacar, driverMoney, SumPayable, Paymentmethods, addressStart, addressEnd, vehicletype, name as username , avatar as avatarUser, phone as phoneUser, Orderstatus, CreateDate FROM Ordertracking JOIN  bookcar ON Ordertracking.idbookacar = bookcar.idboo JOIN user ON bookcar.iduser = user.iduser WHERE IDdriver = ? AND Orderstatus = 0 ORDER BY bookcar.idbookcars DESC ';

		const history = await c.env.DB.prepare(sql).bind(IDdriver).all();

		return c.json(history.results);
	},

	async completeBookcar(c) {
		const body = await c.req.json();

		if (!body.SumPayable || !body.idbookacar || !body.IDdriver || !body.nameDriver || !body.addressEnd || !body.addressStart) {
			return c.json({ success: false, message: 'Vui lòng đầy điền đù thông tin' }, 400);
		}

		if (!body.SpeedometerEnd) {
			return c.json({ success: false, message: 'Vui lòng chụp công tơ mét' });
		}
		let percent = 0.8;
		let monyrestaurant = 0;
		const restaurants = await c.env.DB.prepare('SELECT * FROM restaurant  WHERE codeRestaurant = ?').bind(body.idrestaurant).all();
		if (restaurants.results.length > 0) {
			percent = 0.7;
			monyrestaurant = Math.floor(Number(body.SumPayable) * 0.1);
			await c.env.DB.prepare('UPDATE restaurant SET commission = commission + ? WHERE codeRestaurant = ?')
				.bind(monyrestaurant, body.idrestaurant)
				.run();
		}
		let moneyDiver = Math.floor(Number(body.SumPayable) * percent);
		let monyManage = Number(body.SumPayable) - (moneyDiver + monyrestaurant);

		if (!monyManage || !moneyDiver) {
			return c.json({ success: false, message: 'Vui lòng nhập số tiền đầy đủ' }, 401);
		}
		const updates = [
			c.env.DB.prepare('UPDATE speedometer SET SpeedometerEnd = ? WHERE IdBookcar = ?').bind(body.SpeedometerEnd, body.idbookacar).run(),
			c.env.DB.prepare('UPDATE Ordertracking SET Orderstatus = 0, driverMoney = ?, managerMoney = ? WHERE idbookacar = ? ')
				.bind(moneyDiver, monyManage, body.idbookacar)
				.run(),
			c.env.DB.prepare('UPDATE bookcar SET SumPayable = ? WHERE idboo = ?').bind(body.SumPayable, body.idbookacar).run(),
			c.env.DB.prepare('UPDATE driver SET DriverStatus = 0 WHERE idUser = ?').bind(body.IDdriver).run(),
			c.env.DB.prepare('UPDATE electronicwallet SET totalamount = totalamount + ? WHERE idDriver = ?')
				.bind(moneyDiver, body.IDdriver)
				.run(),
			c.env.DB.prepare('UPDATE admin SET electronicwallet = electronicwallet + ? WHERE email = ?').bind(monyManage, c.env.ADMIN).run(),
		];

		await Promise.all(updates)
			.then(() => {
				console.log('Updating success');
			})
			.catch((error) => {
				return c.json('Kiểm tra lại truy vấn dữ liệu', error, 500);
			});

		try {
			let larks = await axios.post(`https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal`, {
				app_id: c.env.APP_ID,
				app_secret: c.env.APP_SECRET,
			});

			const token = larks.data.tenant_access_token;
			let restaurant = null;
			if (body.idrestaurant) {
				const nameRestaurant = await c.env.DB.prepare('SELECT * FROM restaurant  WHERE codeRestaurant = ?').bind(body.idrestaurant).all();
				if (nameRestaurant.results.length > 0) {
					restaurant = nameRestaurant.results[0].nameRestaurant;
				}
			}
			const base = await Base(body, restaurant);

			const response = await axios.post(
				`https://open.larksuite.com/open-apis/bitable/v1/apps/${c.env.BASE_ID}/tables/${c.env.TABLE_ID}/records/batch_create`,
				base,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(response);
		} catch (error) {
			return c.json({ success: false, message: 'Lỗi lark vui lòng kiểm tra lại' }, 500);
		}

		return c.json({ success: true, message: 'Đơn hàng đã hoàn thành' }, 200);
	},

	async cancelBookcar(c) {
		const body = await c.req.json();

		await c.env.DB.prepare('UPDATE driver SET DriverStatus = 0 WHERE idUser = ?').bind(body.IDdriver).run();
		await c.env.DB.prepare('UPDATE Ordertracking SET Orderstatus = 2, IDdriver = Null WHERE idbookacar = ?').bind(body.idbookcar).run();

		// const token = await c.env.DB.prepare('SELECT * FROM token').all();
		// let acctoken = token.results[0].access_token;
		// let datafile = {
		// 	...body,
		// 	phone: c.env.PHONE_ADMIN,
		// 	status: 'Tài xế từ chối đơn',
		// };
		// const response = await statusOrder(acctoken, datafile);
		// if (response.data.error === -124) {
		// 	let Tokenrefresh = token.results[0].refresh_token;
		// 	let idToken = token.results[0].id;
		// 	const res = await refreshToken(c, Tokenrefresh);
		// 	Tokenrefresh = res.data.refresh_token;
		// 	acctoken = res.data.access_token;
		// 	await c.env.DB.prepare('UPDATE token SET refresh_token = ?, access_token = ? WHERE id = ?')
		// 		.bind(Tokenrefresh, acctoken, idToken)
		// 		.run();
		// 	await statusOrder(acctoken, datafile);
		// }
		return c.json({ success: true, message: 'Đơn hàng từ chối thành công' });
	},

	async informationDriver(c) {
		const idDriver = await c.req.param('idDriver');

		if (!idDriver) {
			return c.json({ success: false, message: 'Vui lòng đăng nhập đúng' });
		}
		const sql =
			'SELECT ew.idDriver ,nameDriver, email, phoneDriver, ew.walletcode, ew.totalamount FROM driver JOIN electronicwallet ew ON driver.idUser = ew.idDriver WHERE idUser = ? ';

		const response = await c.env.DB.prepare(sql).bind(idDriver).all();

		const info = response.results[0];
		return c.json(info, 200);
	},

	async photoSpeedometer(c) {
		const body = await c.req.json();
		await c.env.DB.prepare('INSERT INTO speedometer(IdBookcar, SpeedometerStart, currentposition) VALUES(?, ?, ?)')
			.bind(body.idbookcar, body.SpeedometerStart, body.currentposition)
			.run();
		await c.env.DB.prepare('UPDATE Ordertracking SET  Orderstatus = 5 WHERE idbookacar = ?').bind(body.idbookcar).run();
		return c.json({ success: true, message: 'Lấy công tơ mét thành công' });
	},
};

export default Driver;
