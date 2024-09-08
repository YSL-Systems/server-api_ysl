import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { deleteUserImage, updateUser, updateUserImage } from '../controllers/user.js';
import { supportSite, supportUser } from '../controllers/support.js';
import { fileMiddlewares } from '../middlewares/file.js';

const routerUser = new Router();

routerUser.patch('/:id', [authMiddlewares], errorHandler(updateUser));
routerUser.put('/:id', [authMiddlewares], fileMiddlewares.single('avatar'), errorHandler(updateUserImage));
routerUser.delete('/:id', [authMiddlewares], errorHandler(deleteUserImage));
routerUser.post('/support', [authMiddlewares], errorHandler(supportUser));
routerUser.post('/support-site', errorHandler(supportSite));

export default routerUser;
