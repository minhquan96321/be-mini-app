import { sign } from 'hono/jwt';
import encryption from '../../helper/dencryption';
const adminController = {
	async login(c) {
		const body = await c.req.json();

		const adminEmail = await c.env.DB.prepare('SELECT * FROM admin WHERE email = ? ').bind(body.email).all();

		if (adminEmail.results.length === 0) {
			return c.json({ message: 'Email không tồn tại', success: false }, 401);
		}

		const isValid = await encryption.decryptPassword(adminEmail.results[0].password, body.password);
		if (!isValid) {
			return c.json({ message: 'Mặt khẩu sai vui lòng nhập lại', success: false }, 401);
		}

		const payload = {
			idAdmin: adminEmail.results[0].idAdmin,
			email: adminEmail.results[0].email,
			exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12, // Token expires in 5 minutes
		};

		// const summoney = await c.env.DB.prepare('SELECT SUM(SumPayable) as summoney FROM bookcar WHERE SumPayable IS NOT NULL').all();

		const token = await sign(payload, c.env.SECRET_JWT);
		const admin = {
			email: adminEmail.results[0].email,
			nameAdmin: adminEmail.results[0].nameAdmin,
			dateofbirth: adminEmail.results[0].dateofbirth,
			totalamount: adminEmail.results[0].electronicwallet,
			token: token,
		};
		return c.json({ success: true, message: admin }, 200);
	},

	async register(c) {
		const body = await c.req.json();

		const checkemail = await c.env.DB.prepare('SELECT * FROM admin WHERE email = ?').bind(body.email).all();
		if (checkemail.results.length != 0) {
			return c.json({ success: false, message: 'Email đã tồn tại vui lòng nhập email khác' }, 401);
		}

		const haxPassword = await encryption.encryptPassword(body.password);

		await c.env.DB.prepare('INSERT INTO admin (email, password, nameAdmin, dateofbirth) VALUES (?, ?, ?, ?)')
			.bind(body.email, haxPassword, body.nameAdmin, body.dateofbirth)
			.run();
		return c.json({ success: true, message: 'Tạo tài khoản thành công' }, 200);
	},
};

export default adminController;
