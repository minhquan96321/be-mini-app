
const Role = {
    async createRole(c) {
        const body = await c.req.json();
        let driver = await c.env.DB.prepare("SELECT * FROM role WHERE idByOA = ?").bind(body.idByOA).all();
        if (driver.results == "") {
            const insertedRole = await c.env.DB.prepare("INSERT INTO role(idByOA, drivinglicense, 	address, IDcard, Faceimage, IDcardfront, 	BacksideofIDcard) VALUES (?, ? , ? ,? ,? ,? ,? )").bind(body.userid, body.drivinglicense, body.address, body.IDcard, body.Faceimage, body.IDcardfront, body.BacksideofIDcard).run();
            driver = {
                ...body,
                id: insertedRole.meta.last_row_id
            }
        }
        return c.json({
            ...driver,
        });
    },

    async getRole(c) {
        const role = await c.env.DB.prepare("SELECT * FROM role");
        return c.json(role);
    }
}

export default Role