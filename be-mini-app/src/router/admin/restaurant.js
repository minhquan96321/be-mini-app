import { Hono } from 'hono';
import Restaurant from '../../controller/admin/restaurant';
import { verifyToken } from '../../helper/veritoken';

const routerRestaurant = new Hono();

routerRestaurant.post('/add-restaurant', Restaurant.addRestaurants);
routerRestaurant.get('/restaurant', Restaurant.getRestaurants);
routerRestaurant.put('/remove-restaurant', Restaurant.removeRestaurants);

export default routerRestaurant;
