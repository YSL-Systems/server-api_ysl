import { Router } from 'express';
import routerAuth from './auth.js';
import routerUser from './user.js';
import routerSystem from './system.js';
import routerCategory from './category.js';
import routerScenario from './scenario.js';
import routerSensor from './sensor.js';

const rootRouter = new Router();

rootRouter.use('/auth', routerAuth);
rootRouter.use('/user', routerUser);
rootRouter.use('/system', routerSystem);
rootRouter.use('/category', routerCategory);
rootRouter.use('/scenarios', routerScenario);
rootRouter.use('/sensors', routerSensor);

export default rootRouter;
