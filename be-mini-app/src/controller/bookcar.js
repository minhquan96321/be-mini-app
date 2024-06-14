import { Base } from '../helper/baselark';
const axios = require('axios');

const BookCar = {
    async createBookCar(c) {
        const body = await c.req.json();
        const inserted = await c.env.DB.prepare("INSERT INTO bookcar (userid, idrestaurant, addressStart, addressEnd, vehicletype, Paymentmethods, 	SumPayable) VALUES(?, ?, ?, ?, ?, ?, ?)").bind(body.userid, body.idrestaurant, body.addressStart, body.addressEnd, body.vehicletype, body.Paymentmethods, body.SumPayable).run();
        const latsId = inserted.meta.last_row_id;
        await c.env.DB.prepare("INSERT INTO Ordertracking (idbookacar) VALUES (?)").bind(latsId).run();
        const userBookcar = await c.env.DB.prepare("SELECT user.name FROM bookcar JOIN user on user.idByOA = bookcar.userid WHERE idboo= ?").bind(latsId).all()
        // lark
        const res = await axios.post(`https://open.larksuite.com/open-apis/auth/v3/tenant_access_token/internal`, {
            app_id: c.env.APP_ID,
            app_secret: c.env.APP_SECRET,
        });
        const baseTable = {
            ...body,
            username: userBookcar.results[0].name,
            latsId
        }
        const base = Base(baseTable)
        const rus = await axios.post(`https://open.larksuite.com/open-apis/bitable/v1/apps/${c.env.BASE_ID}/tables/${c.env.TABLE_ID}/records/batch_create`, base,
            {
                headers: {
                    Authorization: `Bearer ${res.data.tenant_access_token}`
                }
            }
        )

        return c.json(rus);
    },

    async getBookCar(c) {
        const body = await c.req.json();
        const sql = "SELECT bk.addressStart, bk.addressEnd,bk.Paymentmethods, bk.SumPayable, dr.name, dr.phone, bk.vehicletype, ord.Orderstatus  FROM bookcar as bk JOIN user as us ON us.idByOA = bk.userid JOIN Ordertracking as ord ON ord.idbookacar = bk.idboo JOIN role ON role.idrole = ord.IDdriver JOIN user dr ON dr.idByOA = role.idByOA  WHERE userid = ?";
        const userBookcar = await c.env.DB.prepare(sql).bind(body.idUser).all();
        return c.json(userBookcar.results);
    }
}


export default BookCar