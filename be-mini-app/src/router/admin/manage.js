import { Hono } from 'hono';
import manageDriver from '../../controller/admin/driver';
import managerBookcar from '../../controller/admin/bookcar';
import statistical from '../../controller/admin/statistical';
import { verifyToken } from '../../helper/veritoken';

const routerManage = new Hono();

//Tài xế
routerManage.get('/manage-driver', manageDriver.driverManagement);
routerManage.put('/remove-driver', verifyToken, manageDriver.removeDriver);

// đơn hàng
routerManage.post('/confirm', verifyToken, managerBookcar.orderTransfer);

routerManage.get('/monthly-revenue', managerBookcar.monthlyRevenue);
routerManage.get('/manage-bookcar', managerBookcar.getNewOrder);
routerManage.get('/get-cancelBookcar', managerBookcar.getCancelOrder);
routerManage.get('/waitingcar', managerBookcar.waitingCar);
routerManage.get('/statistical', statistical.statisticalAll);
routerManage.get('/received', managerBookcar.receivedOrder);
routerManage.get('/complete', managerBookcar.completedOrder);
routerManage.get('/driver-confirmed', managerBookcar.confirmeOrder);

routerManage.delete('/cancel-order/:idbookacar', verifyToken, managerBookcar.cancelOrder);
routerManage.delete('/delete-bookcar/:idbookcar', verifyToken, managerBookcar.deleteBookcar);

export default routerManage;
