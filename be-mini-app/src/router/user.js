import { Hono } from 'hono'
import User from "../controller/user"

const routerUser = new Hono()

routerUser.get("/user", User.getUser)
routerUser.post("/user-current", User.userCurrent)

export default routerUser