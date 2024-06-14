import { Hono } from 'hono'
import routerIndex from './router/index'
const app = new Hono()

app.route("/api", routerIndex)


export default app