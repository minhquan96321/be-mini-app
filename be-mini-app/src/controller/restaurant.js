const Restaurants = {
	async showRevenue(c) {
		const idUser = await c.req.param('idUser');
		const revenue = await c.env.DB.prepare('SELECT * FROM restaurant WHERE idUser = ?').bind(idUser).all();
		return c.json({ success: true, message: revenue.results });
	},

	async getBookcarRestaurant(c) {
		const idRestaurant = await c.req.param('idrestaurant');

		const bookcar = await c.env.DB.prepare(
			'SELECT idbookacar, Orderstatus, addressStart, addressEnd, vehicletype,Paymentmethods, CreateDate, SumPayable  FROM bookcar JOIN Ordertracking ON bookcar.idboo =  Ordertracking.idbookacar WHERE idrestaurant = ? AND Orderstatus = 0'
		)
			.bind(idRestaurant)
			.all();
		return c.json({ success: true, message: bookcar.results });
	},
};

export default Restaurants;
