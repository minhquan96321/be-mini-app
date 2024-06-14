import { Hono } from 'hono'
import BookCar from '../controller/bookcar'

const routerBookcar = new Hono()

routerBookcar.post("/create-bookcar", BookCar.createBookCar)
routerBookcar.get("/get-bookcar", BookCar.getBookCar)

export default routerBookcar