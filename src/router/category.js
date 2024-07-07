import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { allCategory, changeCategory } from '../controllers/category.js';

const routerCategory = new Router();

routerCategory.get('', [authMiddlewares], errorHandler(allCategory));
routerCategory.put('', [authMiddlewares], errorHandler(changeCategory));

export default routerCategory;
