import { Hono } from 'hono'
import routerBookcar from './bookcar'
import routerOrder from './ordertracking'
import routerUser from './user'
import routerRole from './role'

const routerIndex = new Hono()

routerIndex.route("/user", routerUser)
routerIndex.route("/ordertracking", routerOrder)
routerIndex.route("/bookcar", routerBookcar)
routerIndex.route("/role", routerRole)

export default routerIndex