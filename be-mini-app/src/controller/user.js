import secure from "../helper/secure";
const User = {
    async getUser(c) {
        const user = await c.env.DB.prepare("SELECT * FROM user ").all();
        return c.json(user.results);
    },

    async userCurrent(c) {
        const body = await c.req.json();

        let user = await c.env.DB.prepare("SELECT * FROM user WHERE idByOA = ? ").bind(body.idByOA).all();

        if (user.results == "") {
            const inserted = await c.env.DB.prepare("INSERT INTO user (idByOA, name, phone, avatar, isSensitive, followedOA) VALUES(?, ? ,? ,? ,?,?)").bind(body.idByOA, body.name, body.phone, body.avatar, body.isSensitive, body.followedOA).run();
            user = {
                ...body,
                idByOA: body.idByOA,
                id: inserted.meta.last_row_id
            }
        }
        return c.json({
            ...user,
            token: await secure.generateJWT({ id: user.idByOA }, c.env.JWT_SECRET)
        })
    }
}

export default User