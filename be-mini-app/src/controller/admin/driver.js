const manageDriver = {
	async driverManagement(c) {
		const sql =
			'SELECT user.idUser, nameDriver, phoneDriver, email, Faceimage as avataDriver, address, IDcard FROM user JOIN driver ON user.idUser = driver.idUser WHERE isDriver = 1';
		const driver = await c.env.DB.prepare(sql).all();

		return c.json(driver.results);
	},

	async removeDriver(c) {
		const body = await c.req.json();
		await c.env.DB.prepare('DELETE FROM driver  WHERE idUser = ?').bind(body.idDriver).run();
		await c.env.DB.prepare('UPDATE user SET isDriver = 0 WHERE idUser = ?').bind(body.idDriver).run();
		await c.env.DB.prepare('DELETE FROM electronicwallet WHERE idDriver = ?').bind(body.idDriver).run();
		return c.json({ message: 'Xóa thành công', success: true }, 200);
	},
};

export default manageDriver;
