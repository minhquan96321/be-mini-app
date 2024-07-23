import { Hono } from 'hono';
import routerBookcar from './bookcar';

import routerRestaurants from './restaurant';
import routerUser from './user';
import routerDriver from './driver';
import routerManage from './admin/manage';
import routerAdmin from './admin/account';
import routerRestaurant from './admin/restaurant';

const routerIndex = new Hono();

routerIndex.route('/user', routerUser);
routerIndex.route('/bookcar', routerBookcar);
routerIndex.route('/driver', routerDriver);
routerIndex.route('/restaurant', routerRestaurants);
// manager
routerIndex.route('/manage', routerManage);
routerIndex.route('/manage-account', routerAdmin);
routerIndex.route('/manage-restaurant', routerRestaurant);

export default routerIndex;
