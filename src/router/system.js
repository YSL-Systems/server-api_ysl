import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { allSystems, changeSystem, favoriteSystem } from '../controllers/system.js';

const routerSystem = new Router();

routerSystem.get('', [authMiddlewares], errorHandler(allSystems));
routerSystem.put('', [authMiddlewares], errorHandler(changeSystem));
routerSystem.patch('/:id', [authMiddlewares], errorHandler(favoriteSystem));

export default routerSystem;
