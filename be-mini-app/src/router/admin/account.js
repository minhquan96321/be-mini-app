import { Hono } from 'hono';
import adminController from '../../controller/admin/admin';

const routerAdmin = new Hono();

routerAdmin.post('/login', adminController.login);
routerAdmin.post('/register', adminController.register);


export default routerAdmin;
