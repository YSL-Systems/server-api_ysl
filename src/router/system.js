import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { addSystem, allSystems, changeSystem, favoriteSystem } from '../controllers/system.js';
import adminMiddlewares from '../middlewares/admin.js';
import controllerMiddlewares from '../middlewares/controller.js';
import { addOutput, changeNameOutput, changeParametersOutput } from '../controllers/outputs.js';

const routerSystem = new Router();

routerSystem.get('', [authMiddlewares], errorHandler(allSystems));
routerSystem.put('', [authMiddlewares], errorHandler(changeSystem));
routerSystem.patch('/:id', [authMiddlewares], errorHandler(favoriteSystem));
routerSystem.post('', [authMiddlewares, adminMiddlewares], errorHandler(addSystem));

routerSystem.post('/setting/outputs', [authMiddlewares], errorHandler(addOutput));
routerSystem.patch('/setting/outputs', [authMiddlewares], errorHandler(changeNameOutput));
routerSystem.put('/setting/outputs', [authMiddlewares, controllerMiddlewares], errorHandler(changeParametersOutput));

export default routerSystem;
