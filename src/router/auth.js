import { Router } from 'express';
import { login, logout, me, refresh, registration, verify } from '../controllers/auth.js';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import adminMiddlewares from '../middlewares/admin.js';
import refreshMiddlewares from '../middlewares/refresh.js';

const routerAuth = new Router();

routerAuth.post('/registration', errorHandler(registration));
routerAuth.post('/login', errorHandler(login));
routerAuth.get('/me', [authMiddlewares], errorHandler(me));
routerAuth.get('/verify', [authMiddlewares], errorHandler(verify));
routerAuth.post('/refresh', [refreshMiddlewares], errorHandler(refresh));
routerAuth.post('/logout', errorHandler(logout));

export default routerAuth;

//[authMiddlewares, adminMiddlewares],
