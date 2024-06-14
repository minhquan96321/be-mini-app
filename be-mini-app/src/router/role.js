import { Hono } from 'hono'
import Role from "../controller/role"

const routerRole = new Hono()

routerRole.post("/create-role", Role.createRole)
routerRole.get("/get-role", Role.getRole)

export default routerRole