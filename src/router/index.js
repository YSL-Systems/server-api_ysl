import { Router } from 'express';
import routerAuth from './auth.js';
import routerUser from './user.js';
import routerSystem from './system.js';
import routerCategory from './category.js';

const rootRouter = new Router();

rootRouter.use('/auth', routerAuth);
rootRouter.use('/user', routerUser);
rootRouter.use('/system', routerSystem);
rootRouter.use('/category', routerCategory);

export default rootRouter;
