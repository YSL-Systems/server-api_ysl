import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import {
  addScenario,
  allScenario,
  changeConfigurationScenario,
  changeNameScenario,
  deleteScenario,
} from '../controllers/scenario.js';
import controllerMiddlewares from '../middlewares/controller.js';

const routerScenario = new Router();

routerScenario.get('', [authMiddlewares], errorHandler(allScenario));
routerScenario.post('', [authMiddlewares], errorHandler(addScenario));
routerScenario.put('', [authMiddlewares, controllerMiddlewares], errorHandler(deleteScenario));
routerScenario.patch('', [authMiddlewares], errorHandler(changeNameScenario));
routerScenario.post('/configuration', [authMiddlewares, controllerMiddlewares], errorHandler(changeConfigurationScenario));

export default routerScenario;
