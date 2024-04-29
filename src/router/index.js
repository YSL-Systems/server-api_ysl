import { Router } from 'express';
import routerAuth from './auth.js';
import routerUser from './user.js';

const rootRouter = new Router();

rootRouter.use('/auth', routerAuth);
rootRouter.use('/user', routerUser);

export default rootRouter;
