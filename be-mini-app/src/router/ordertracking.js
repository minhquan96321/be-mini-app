import { Hono } from 'hono'
import Ordertracking from '../controller/ordertracking'

const routerOrder = new Hono()

routerOrder.put("/receive", Ordertracking.receiveApplication)

export default routerOrder