import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { updateUser, updateUserImage } from '../controllers/user.js';

const routerUser = new Router();

routerUser.patch('/:id', [authMiddlewares], errorHandler(updateUser));
routerUser.put('/:id', [authMiddlewares], errorHandler(updateUserImage));

export default routerUser;
