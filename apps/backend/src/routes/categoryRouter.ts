import { CreateCategoryController } from '@modules/products/services/createCategory/CreateCategoryController';
import { ListCategoryController } from '@modules/products/services/listCategory/ListCategoryController';
import { Router } from 'express';

const categoryRouter = Router();

const createCategoryController = new CreateCategoryController()
const listCategoryController = new ListCategoryController()

categoryRouter.get('/categories', listCategoryController.handle);
categoryRouter.post('/categories', createCategoryController.handle);

export { categoryRouter };
