import { Hono } from 'hono'
import { cors } from 'hono/cors'
import routerIndex from './router/index'
// import message from './socket/notification'
const app = new Hono()
app.use('/api/*', cors())
app.route("/api", routerIndex)
// app.route('', message)



export default app