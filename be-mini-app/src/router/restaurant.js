import { Hono } from 'hono';
import Restaurants from '../controller/restaurant';

const routerRestaurants = new Hono();

routerRestaurants.get('/revenue/:idUser', Restaurants.showRevenue);
routerRestaurants.get('/bookcar/:idrestaurant', Restaurants.getBookcarRestaurant);

export default routerRestaurants;
