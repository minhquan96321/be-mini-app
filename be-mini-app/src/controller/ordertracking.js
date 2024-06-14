
const Ordertracking = {
    async receiveApplication(c) {
        const body = await c.req.json();
        const receiveOder = await c.env.DB.prepare("UPDATE Ordertracking SET IDdriver=? WHERE idOrdertracking = ?").bind(body.IDdriver, body.idOrdertracking).run();
        return c.json(receiveOder);
    },

    async completeOrdertracking(c) {
        const body = await c.req.json();
        await c.env.DB.prepare("UPDATE Ordertracking SET Orderstatus=? WHERE idOrdertracking = ?").bind(body.status).run();
    }
}

export default Ordertracking    