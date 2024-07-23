import { Hono } from 'hono';
import BookCar from '../controller/bookcar';

const routerBookcar = new Hono();

routerBookcar.post('/create-bookcar', BookCar.createBookCar);

// routerBookcar.delete("/cancel-bookcar", BookCar.cancelBookcar)

routerBookcar.get('/get-bookcar/:id', BookCar.getBookCar);
routerBookcar.get('/detail-bookcar/:IDbookcar', BookCar.detailBookcar);

export default routerBookcar;
