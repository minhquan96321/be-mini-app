const statistical = {
	async statisticalAll(c) {
		const user = await c.env.DB.prepare('SELECT COUNT(*) as totalUser FROM user').all();
		const driver = await c.env.DB.prepare('SELECT COUNT(*) as totalDriver FROM driver').all();
		const bookcard = await c.env.DB.prepare('SELECT COUNT(*) as totalBookcar FROM bookcar').all();

		const data = user.results.concat(driver.results, bookcard.results);

		return c.json({ data }, 200);
	},

	async statisticalWeek(c) {
		const data = c.env.DB.prepare(
			'SELECT * FROM Ordertracking JOIN bookcar ON Ordertracking.idbookacar = bookcar.idboo WHERE Orderstatus = 0'
		).all();

        return data
	},
};

export default statistical;
