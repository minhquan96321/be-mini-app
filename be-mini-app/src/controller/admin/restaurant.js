import { generateRestaurantCode } from '../../helper/randomcode';

const Restaurant = {
	async addRestaurants(c) {
		const body = await c.req.json();

		const code = generateRestaurantCode();
		const sql = 'INSERT INTO restaurant(idUser ,codeRestaurant, nameRestaurant, addressRestaurant,phoneRestaurant) VALUES (?, ?, ?, ?, ?)';
		await c.env.DB.prepare(sql).bind(body.idUser, code, body.nameRestaurant, body.address, body.phoneRestaurant).run();
		await c.env.DB.prepare('UPDATE user SET isRestaurant = 1 WHERE idUser = ?').bind(body.idUser).run();

		return c.json({ success: true, message: 'Đăng ký nhà hàng thành công' });
	},

	async getRestaurants(c) {
		const restaurants = await c.env.DB.prepare(
			'SELECT phone as phoneUser ,name as nameUser, phoneRestaurant, codeRestaurant, nameRestaurant, addressRestaurant, user.idUser FROM user JOIN restaurant ON user.idUser = restaurant.idUser'
		).all();

		return c.json({ success: true, message: restaurants.results });
	},

	async removeRestaurants(c) {
		const body = await c.req.json();
		await c.env.DB.prepare('DELETE  FROM restaurant WHERE idUser = ? AND codeRestaurant = ?').bind(body.idUser, body.codeRestaurant).run();
		const user = await c.env.DB.prepare('SELECT *FROM restaurant WHERE idUser = ?').bind(body.idUser).all();
		if (user.results.length > 0) {
			return c.json({ success: true, message: 'Xóa nhà hàng thành công' });
		}

		await c.env.DB.prepare('UPDATE user SET isRestaurant = 0 WHERE idUser = ?').bind(body.idUser).run();
		return c.json({ success: true, message: 'Xóa nhà hành thồng công' });
	},
};

export default Restaurant;
