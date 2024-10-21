import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { addSensor, addTypeSensor, allTypeSensor, changeNameSensor, deleteSensor } from '../controllers/sensor.js';
import adminMiddlewares from '../middlewares/admin.js';
import controllerMiddlewares from '../middlewares/controller.js';

const routerSensor = new Router();

routerSensor.post('/type', [authMiddlewares, adminMiddlewares], errorHandler(addTypeSensor));
routerSensor.get('/type', [authMiddlewares], errorHandler(allTypeSensor));
routerSensor.post('', [authMiddlewares, controllerMiddlewares], errorHandler(addSensor));
routerSensor.put('', [authMiddlewares, controllerMiddlewares], errorHandler(deleteSensor));
routerSensor.patch('', [authMiddlewares], errorHandler(changeNameSensor));

export default routerSensor;
