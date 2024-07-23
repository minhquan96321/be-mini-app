import { Hono } from 'hono';
import Driver from '../controller/driver';
import { verifyToken } from '../helper/veritoken';

const routerDriver = new Hono();

routerDriver.post('/create-driver', verifyToken, Driver.createDriver);
routerDriver.post('/speedometer', Driver.photoSpeedometer);

routerDriver.get('/get-driver', Driver.getDriver);
routerDriver.get('/delivered-order/:IDdriver', Driver.newApplication);
routerDriver.get('/history-bookcar/:IDdriver', Driver.historyBookcar);
routerDriver.get('/info-driver/:idDriver', Driver.informationDriver);
// routerDriver.get('/amount-wallet/:idDriver', Driver.totalAmountWallet);
// routerDriver.get("/confirmed-bookcar", Driver.confirmedBookcar)

// routerDriver.put('/image-driver', Driver.imageDriver);

routerDriver.put('/confirm-bookcar', Driver.confirmBookcar);
routerDriver.put('/complete-bookcar', Driver.completeBookcar);
routerDriver.put('/cancel-order', Driver.cancelBookcar);

export default routerDriver;
