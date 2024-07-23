import { Hono } from 'hono';
import User from '../controller/user';

const routerUser = new Hono();

routerUser.get('/user', User.getUser);
routerUser.post('/user-current', User.userCurrent);
routerUser.get('/history-bookcar/:idUser', User.historyBookcar);
routerUser.get('/status-bookcar/:idUser', User.statusBookcar);

export default routerUser;
