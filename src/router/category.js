import { Router } from 'express';
import { errorHandler } from '../error-handler.js';
import authMiddlewares from '../middlewares/auth.js';
import { addCategory, allCategory, changeCategory } from '../controllers/category.js';
import adminMiddlewares from '../middlewares/admin.js';

const routerCategory = new Router();

routerCategory.get('', [authMiddlewares], errorHandler(allCategory));
routerCategory.put('', [authMiddlewares], errorHandler(changeCategory));
routerCategory.post('', [authMiddlewares, adminMiddlewares], errorHandler(addCategory));

export default routerCategory;
